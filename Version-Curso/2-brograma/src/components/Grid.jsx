import { useEffect, useState } from 'react'
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from "./WorkoutCard.jsx"

export default function Grid() {

    const [savedWorkouts, setSavedWorkouts] = useState(null)
    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const completeWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {

        const entry = savedWorkouts[val]
        return entry.isComplete

    })

    function handleSave (index, data) {

        const newObj = {

            ...savedWorkouts,
            [index]: {

                ...data,
                isComplete: !!data.isComplete || savedWorkouts?.[index]?.isComplete

            }
        }

        setSavedWorkouts(newObj)
        localStorage.setItem("brograma", JSON.stringify(newObj));
        setSelectedWorkout(null)

    }

    function handleComplete (index, data) {

        const newObj = {...data}
        newObj.isComplete = true
        handleSave(index, newObj)

    }

    useEffect(() => {

        if(!localStorage) {return}

        let savedData = {}

        if(localStorage.getItem("brograma")) {

            savedData = JSON.parse(localStorage.getItem("brograma"))

        }

        setSavedWorkouts(savedData)

    }, [])

    return (

        <div className="training-plan-grid">

            {Object.keys(training_plan).map((workout, workoutIndex) => {

                const isLocked = workoutIndex === 0 ?
                    false :
                    !completeWorkouts.includes(`${workoutIndex - 1}`)

                const type = workoutIndex % 3 === 0 ? (

                    "Empujar"

                ) : (

                    workoutIndex % 3 === 1 ? (

                        "Tirar"

                    ) : (

                        "Piernas"

                    )

                )

                const icon = type === "Empujar" ? (

                    <i className="fa-solid fa-dumbbell"></i>

                ) : (

                    type === "Tirar" ? (

                        <i className="fa-solid fa-weight-hanging"></i>

                    ) : (

                        <i className="fa-solid fa-bolt"></i>

                    )
                    
                )

                const dayNum = ((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : workoutIndex + 1

                const trainingPlan = training_plan[workoutIndex]

                if (selectedWorkout === workoutIndex) {

                    return (

                        <WorkoutCard key={workoutIndex}  
                            trainingPlan={trainingPlan} 
                            type={type}
                            icon={icon} 
                            workoutIndex={workoutIndex}
                            dayNum={dayNum}
                            handleSave={handleSave}
                            handleComplete={handleComplete}
                            savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                        />

                    )

                }

                const gridType = isLocked ? (

                    "card plan-card inactive"

                ) : (

                    "card plan-card"

                )

                return (

                    <button onClick={() => {

                        if(isLocked) {return}

                        setSelectedWorkout(workoutIndex)

                    }} className={gridType} key={workoutIndex}>

                        <div className='plan-card-header'>

                            <p> Día {dayNum}</p>

                            {isLocked ? (

                            <i className='fa-solid fa-lock'></i>

                        ) : (

                            icon

                        )}

                        </div>

                        <div className='plan-card-header'>

                            <h4><b>{type}</b></h4>

                        </div>
                        
                    </button>

                )

            })}

        </div>

    )

}