import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from "./WorkoutCard.jsx"

export default function Grid() {

    const isLocked = false
    const selectedWorkout = 4

    return (

        <div className="training-grid-plan">

            {Object.keys(training_plan).map((workout, workoutIndex) => {

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
                        />

                    )

                }

                const gridType = isLocked ? (

                    "card plan-card inactive"

                ) : (

                    "card plan-card"

                )

                return (

                    <button className={gridType} key={workoutIndex}>

                        <div className='plan-card-header'>

                            <p> Day {dayNum}</p>

                        </div>

                        {isLocked ? (

                            <i className='fa-solid fa-lock'></i>

                        ) : (

                            icon

                        )}

                        <div className='plan-card-header'>

                            <h4><b>{type}</b></h4>

                        </div>
                        
                    </button>

                )

            })}

        </div>

    )

}