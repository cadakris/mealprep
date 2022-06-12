import React from 'react'
import { Draggable } from "react-beautiful-dnd"
import { RiDeleteBin2Fill, } from "react-icons/ri"
import { GrDuplicate, } from "react-icons/gr";
import { FaEdit } from "react-icons/fa"


function RecipeCard({recipe, index, setColumnDays, user, setClickedRecipe, clickedRecipe, onDuplicateClick}) {
    function handleDeleteClick() {
        fetch(`/recipes/${recipe.id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((deletedData) => {
          fetch(`/users/${user.id}/days`)
          .then((res) => res.json())
          .then((arrOfDays) => setColumnDays(arrOfDays))
        })
      }

    function handleEditClick () {
      console.log("Clicked Recipe",clickedRecipe)
      setClickedRecipe(recipe)
    }

    function handleDuplicateClick () {
      // fetch(`meal_recipe_days/${recipe.id}`)
      fetch(`/recipes`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        recipe_name: recipe.recipe_name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        comment: recipe.comment,
        categories: recipe.categories,
        image_url: recipe.image_url,
      }),
    })
    .then((res) => res.json())
    // .then((duplicateObj) => console.log("duplicate object",duplicateObj.id))
    .then((duplicateObj) => {
      fetch('/meal_recipe_days', {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }, 
        body: JSON.stringify({
          recipe_id: duplicateObj.id,
          day_id: user.days[0].id
        })
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
         fetch(`/users/${user.id}/days`)
        .then((res) => res.json())
        .then((completeDuplicateInfo) => {
          setColumnDays(completeDuplicateInfo)})
      })
      onDuplicateClick()
      })
  }

  return (
    <>
    <Draggable key={recipe.id} draggableId={recipe.id.toString()} index={index}>
        {provided =>(
            <div className="taskListContent"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
              <div className="taskInformation">
                    <h3 className="recipeNameOnCard">{" "}{recipe.recipe_name}{" "}</h3>
                      <div className={`secondary-details ${recipe.categories}`}>
                        <p className="recipeCategory">{recipe.categories}</p>
                        </div>
                        <div className="recipeCardImageContainer">
                          {recipe.image_url?  <img className="recipeCardImage" src={recipe.image_url}></img> : null}
                       
                        </div>
                    <div className="cardButtons">
                    <GrDuplicate className="recipeCardIcons"
                        size={17}
                        onClick={handleDuplicateClick}
                    />
                    <RiDeleteBin2Fill className="recipeCardIcons"
                        size={18}
                        onClick={handleDeleteClick}
                    />
                    <FaEdit className="recipeCardIcons"
                        size={18}
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
