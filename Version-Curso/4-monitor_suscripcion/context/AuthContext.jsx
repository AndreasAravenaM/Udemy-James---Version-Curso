"use client"

import { auth, db } from "@/firebase"
import { subscriptions } from "@/utils"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {

    return useContext(AuthContext)

}

export function AuthProvider(props) {

    const {children} = props
    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)

    function signUp(email, password) {

        return createUserWithEmailAndPassword(auth, email, password)

    }

    function login(email, password) {

        return signInWithEmailAndPassword(auth, email, password)

    }

    function logout () {

        setCurrentUser(null)
        setUserData(null)

        return signOut(auth)

    }

    async function saveToFirebase(data) {

        try {

            const userRef = doc(db, "users", currentUser.uid)
            const res = await setDoc(userRef, {subscriptions: data}, {merge: true})

        } catch(err) {

            console.log(err.message)

        }
        
    }

    async function handleAddSubscription(newSubscription) {
        
        const newSubscriptions = [...userData.subscriptions, newSubscription]
        setUserData({subscriptions: newSubscriptions})
        await saveToFirebase(newSubscriptions)
        
    }

    async function handleDeleteSubscription(index) {

        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {

            return valIndex !== index

        })

        setUserData({subscriptions: newSubscriptions})
        await saveToFirebase(newSubscriptions)
        
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async user => {

            try {

                setCurrentUser(user)

                if(!user) {return}

                setLoading(true)

                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)

                console.log("Buscando datos de usuario en la base de datos")

                let firebaseData = {subscriptions: []}

                if(docSnap.exists()) {

                    console.log("Datos encontrados")
                    firebaseData = docSnap.data()

                }

                setUserData(firebaseData)
                setLoading(false)

            } catch (err) {

                console.log(err.message)

            }

        })

    }, [])

    const value = {currentUser, userData, loading, signUp, login, logout, handleAddSubscription, handleDeleteSubscription}

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    )


}