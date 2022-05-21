import React from 'react'
import { Draggable } from "react-beautiful-dnd"


function TaskCard({recipe, index}) {
  return (
    <>
    <Draggable key={recipe.id} draggableId={recipe.id.toString()} index={index}>
        {provided =>(
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
            <div className="taskInformation">
                <p>{recipe.recipe_name}</p>
                <div className="secondary-details">
                <p>{recipe.instructions}</p>
                </div>
            </div>
            </div>
        )}

    </Draggable>
    </>
  )
}

export default TaskCard