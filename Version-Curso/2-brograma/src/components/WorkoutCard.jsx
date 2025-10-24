import React from "react"

export default function WorkoutCard(props) {

    const {trainingPlan, workoutIndex, type, icon, dayNum} = props
    const {warmup, workout} = trainingPlan || {}

    return (

        <div className="workout-container">

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

                                <button className="help-icon">

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

                {workout.map((workoutExercise, workoutIndex) => {

                    return (

                        <React.Fragment key={workoutIndex}>

                            <div className="exercise-name">

                                <p>{workoutIndex + 1}. {workoutExercise.name}</p>

                                <button className="help-icon">

                                    <i className="fa-regular fa-circle-question" />

                                </button>

                            </div>

                            <p className="exercise-info">{workoutExercise.sets}</p>
                            <p className="exercise-info">{workoutExercise.reps}</p>
                            <input className="weight-input" placeholder="5" />

                        </React.Fragment>

                    )

                })}

            </div>

            <div className="workout-buttons">

               <button>Guardar y Salir</button>
               <button disabled={true}>Completar</button>

            </div>

        </div>

    )

}