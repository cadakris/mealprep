import React from 'react'
import { Draggable } from "react-beautiful-dnd"
import { RiDeleteBin2Fill } from "react-icons/ri"

function TaskCard({recipe, index, columnDays, setColumnDays}) {

    // function deleteRecipe () {
    //     console.log("i work")
    //     console.log(recipe)
    // }

    // function deleteItem(deletedItem) {
    //     fetch(`http://localhost:9292/itemdelete/${deletedItem.id}`, {
    //       method: "DELETE",
    //     })
    //     setUserItems({...userItems, items: userItems.items.filter(item => item.id !== deletedItem.id)})
    //   }

    function handleClick() {
        console.log(recipe.id)
        console.log({columnDays})
        fetch(`/recipes/${recipe.id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((deletedData) => console.log(deletedData))
      }

    //   setColumnDays({...columnDays, items: userItems.items.filter(item => item.id !== deletedItem.id)})

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
                    <div className="closeButton">
                    <RiDeleteBin2Fill
                        onClick={handleClick}
                    />
                </div>
                </div>
            </div>
        )}

    </Draggable>
    </>
  )
}

export default TaskCard
