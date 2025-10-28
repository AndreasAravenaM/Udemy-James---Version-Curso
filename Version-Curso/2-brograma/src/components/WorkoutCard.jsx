import React, {use, useState} from "react"
import Modal from "./Modal"
import {exerciseDescriptions} from "../utils"

export default function WorkoutCard(props) {

    const {trainingPlan, workoutIndex, type, icon, dayNum, savedWeights, handleSave, handleComplete} = props
    const {warmup, workout} = trainingPlan || {}
    const [showExerciseDescription, setShowExerciseDescription] = useState(null)
    const [weights, setWeights] = useState(savedWeights || {})

    function handleAddWeight (title, weight) {

        const newObj = {

            ...weights,
            [title]:  weight

        }

        setWeights(newObj)

    }

    return (

        <div className="workout-container">

            {showExerciseDescription && (<Modal showExerciseDescription={showExerciseDescription}
                handleCloseModal={() => {

                    setShowExerciseDescription(null)

                }}
            />)}

            <div className="workout-card card">

                <div className="plan-card-header">

                    <p>Día {dayNum}</p>
                    {icon}

                </div>

                <div className="plan-card-header">

                    <h2><b>Tipo de Ejercicio: {type}</b></h2>

                </div>

            </div>

            <div className="workout-grid">

                <div className="exercise-name">

                    <h4>Calentamiento</h4>

                </div>

                <h6>Sets</h6>
                <h6>Repeticiones</h6>
                <h6 className="weight-input">Peso máximo</h6>

                {warmup.map((warmupExercise, warmupIndex) => {

                    return (

                        <React.Fragment key={warmupIndex}>

                            <div className="exercise-name">

                                <p>{warmupIndex + 1}. {warmupExercise.name}</p>

                                <button onClick={() => {

                                    setShowExerciseDescription({

                                        name: warmupExercise.name,
                                        description: exerciseDescriptions[warmupExercise.name]

                                    })

                                }} className="help-icon">

                                    <i className="fa-regular fa-circle-question" />

                                </button>

                            </div>

                            <p className="exercise-info">{warmupExercise.sets}</p>
                            <p className="exercise-info">{warmupExercise.reps}</p>

                            <input className="weight-input" placeholder="N/A" disabled />

                        </React.Fragment>

                    )

                })}

            </div>

            <div className="workout-grid">

                <div className="exercise-name">

                    <h4>Ejercicio</h4>

                </div>

                <h6>Sets</h6>
                <h6>Repeticiones</h6>
                <h6 className="weight-input">Peso máximo</h6>

                {workout.map((workoutExercise, wIndex) => {

                    return (

                        <React.Fragment key={wIndex}>

                            <div className="exercise-name">

                                <p>{wIndex + 1}. {workoutExercise.name}</p>

                                <button onClick={() => {

                                    setShowExerciseDescription({

                                        name: workoutExercise.name,
                                        description: exerciseDescriptions[workoutExercise.name]

                                    })

                                }} className="help-icon">

                                    <i className="fa-regular fa-circle-question" />

                                </button>

                            </div>

                            <p className="exercise-info">{workoutExercise.sets}</p>
                            <p className="exercise-info">{workoutExercise.reps}</p>
                            <input value={weights[workoutExercise.name || ""]} onChange={(e) => {

                                handleAddWeight(workoutExercise.name, e.target.value)

                            }} className="weight-input" placeholder="5" />

                        </React.Fragment>

                    )

                })}

            </div>

            <div className="workout-buttons">

                <button onClick={() => {

                    handleSave(workoutIndex, {weights})

                }} >Guardar y Salir</button>

                <button onClick={() =>{

                    handleComplete(workoutIndex, {weights})

                }} disabled={Object.keys(weights).length !== workout.length}>Completar</button>

            </div>

        </div>

    )

}