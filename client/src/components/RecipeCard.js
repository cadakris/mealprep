import React, {useState} from 'react'
import { Draggable } from "react-beautiful-dnd"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { FaEdit } from "react-icons/fa"

function RecipeCard({recipe, index, setColumnDays, user, setClickedRecipe, clickedRecipe}) {
  
    function handleDeleteClick() {
        fetch(`/recipes/${recipe.id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((deletedData) => {
          console.log(deletedData)
          fetch(`/users/${user.id}/days`)
          .then((res) => res.json())
          .then((arrOfDays) => setColumnDays(arrOfDays))
        })
      }

    function handleEditClick () {
      console.log(recipe)
      setClickedRecipe(recipe)
    }

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
                      <div className={`secondary-details ${recipe.categories}`}>
                        <p>{recipe.categories}</p>
                        </div>
                    <div className="closeButton">
                    <RiDeleteBin2Fill
                        onClick={handleDeleteClick}
                    />
                    <FaEdit
                        onClick={handleEditClick}
                    />
                </div>
                </div>
            </div>
        )}

    </Draggable>
    </>
  )
}

export default RecipeCard
