import React, { useState, useEffect,  } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ModalShowRecipeDetails from './ModalShowRecipeDetails';
import { GrAddCircle } from "react-icons/gr"
import RecipeCard from './RecipeCard';

import "./UserRecipePage.css"

//DEFAULT FORM INFORMATION TO PLUG INTO STATE FOR THE FORM
const defaultFormState = {
      recipe_name: "",
      ingredients: "",
      instructions: "",
      comment: "",
      categories: ""
    }
 
function UserRecipePage({setUser, user}) {
//set columndays gets the data - title, description, the columns etc. 
  const [columnDays, setColumnDays] = useState({})
  const [formData, setFormData] = useState(defaultFormState)
  const [clickedRecipe, setClickedRecipe] = useState(null)

    // FETCH USER'S DAY OF THE WEEK
    useEffect(() => {
      fetch(`/users/${user.id}/days`)
      .then((res) => res.json())
      .then((arrOfDays) => setColumnDays(arrOfDays))
    },[])

  //FORM POSTING
  function handleFormSubmit(e){
    e.preventDefault()
  
    fetch(`/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        recipe_name: formData.recipe_name,
        ingredients: [formData.ingredients],
        instructions: new Array(formData.instructions),
        comment: formData.comment,
        categories: formData.categories
      }),
    })
    .then((res) => res.json())
    .then((recipeObj) => {
      console.log(recipeObj)
      fetch('/meal_recipe_days', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          recipe_id: recipeObj.id,
          day_id: user.days[0].id,
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        fetch(`/users/${user.id}/days`)
        .then((res) => res.json())
        .then((arrOfDays) => setColumnDays(arrOfDays))
      })
      setFormData(defaultFormState)
      }
    )}

  //HANDLING FORM INPUTS
function handleChange (e) {
  setFormData({
    ...formData, [e.target.name]: e.target.value,
  })
}

//THIS IS TO CLOSE MODAL
function closeModal() {
  setClickedRecipe()
}
  
  //THIS IS THE DRAG AND DROP FUNCTION
  const onDragEnd = (result, columnsDays, setColumnDays) => {
    console.log("columnDays:", columnDays)
    console.log("result:", result)
    if (!result.destination) return
    //destruction result into source ad destiation
    const { source, destination} = result
    console.log('ID',result.draggableId)
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columnsDays[source.droppableId]
      console.log("initial state of the source",sourceColumn)
      const destColumn = columnsDays[destination.droppableId]
      console.log("where the card is going:", destColumn)
      const sourceRecipes = [...sourceColumn.recipes]
      console.log("source recipes", sourceRecipes)
      const destRecipes = [...destColumn.recipes]
      console.log("destination recipes", destRecipes)
      console.log(`${destRecipes.id}`)
      const [removed] = sourceRecipes.splice(source.index, 1)
      destRecipes.splice(destination.index, 0, removed)
      //THIS IS FOR WHEN WE CHANGE FROM COLUMN TO COLUMN. FIRST WE WANT TO 
      setColumnDays({
        ...columnsDays,
        [source.droppableId]: {
          ...sourceColumn,
          recipes: sourceRecipes,
        },
        [destination.droppableId]: {
          ...destColumn,
          recipes: destRecipes,
        },
      })
      // console.log("new state of column days:", columnDays)
      // console.log("day_id:", destColumn)
      console.log("recipe",result.draggableId)
      console.log("day_id", destColumn.id)
      console.log(result)

      fetch(`/meal_recipe_days/${result.draggableId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({"day_id":destColumn.id}),
      })
      .then((res) => res.json())
      .then((newRecipeDayData) => console.log('MynewREcipe',newRecipeDayData))

    //THIS IS FOR WHEN WE ARE REARRANGING THE INDEX WITHIN THE COLUMN
    } else {
      const destColumn = columnsDays[destination.droppableId]
      const column = columnsDays[source.droppableId]
      const copiedItems = [...column.recipes]
      const copiedMealRecipeDays = [...column.meal_recipe_days]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumnDays({
        ...columnsDays,
        [source.droppableId]: {
          ...column,
          recipes: copiedItems,
        },
      })
      console.log("recipes from columndays", columnDays[`${destination.droppableId}`].recipes)
      console.log("day_id", destColumn.id)
      console.log("copieditems",copiedItems)
      console.log("column",column)

// create fetch to save index
  fetch(`/days/${destColumn.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify(`{"recipes": [${{copiedItems}}]`),
    body: JSON.stringify({"meal_recipe_days": `${copiedMealRecipeDays}}]`}),
  })
  .then((res) => res.json())
  .then((columnDaysNewIndex) => console.log('newIndexShit',columnDaysNewIndex))

    }
  }

  console.log("user: ", user)
  console.log("days user id: ", columnDays)



//START OF THE RETURN
  return (
<>
<DragDropContext onDragEnd={result => onDragEnd(result, columnDays, setColumnDays )}>
  <div className="column-container dayScroll">
    <div className="columnDays">
      {Object.entries(columnDays).map(([columnId, column], index) => 
      
      { if (column.id === 1) {
        return ( 
          // console.log(columnId)
          // console.log(Object.entries(columnDays))
          <Droppable key={columnId} droppableId={columnId} columnDays={columnDays} setColumnDays={setColumnDays}>
            {(provided, snapshot) => (
              <div className="taskListWrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}>
        <div className="columnTitleDiv"><h1 className="columnTitle"> {column.title_day} </h1></div>
              <div className="taskList recipeScroll" id="RecipeDay">
                <form onSubmit={handleFormSubmit}>
                      <input className="addRecipe"
                        placeholder='Add Recipe Name'
                        type="text"
                        name="recipe_name"
                        onChange={handleChange}
                        value={formData.recipe_name}
                        ></input>    
                        <select className="category"
                          defaultValue="Choose Meal Category"
                          name="categories"
                          onChange={handleChange}
                          value={formData.categories}
                        >
                          <option name="Choose_Category">Choose Category</option>
                          <option name="categories">Breakfast</option>
                          <option name="categories">Lunch</option>
                          <option name="categories">Dinner</option>
                          <option name="categories">Snack</option>
                        </select>
                        <button className="addIcon"><GrAddCircle size={20} /></button>                 
                  </form>   
                    
               {clickedRecipe ? <ModalShowRecipeDetails clickedRecipe={clickedRecipe} setColumnDays={setColumnDays} user={user} closeModal={closeModal}/> : null}
                {column?.recipes?.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} columnDays={columnDays} setColumnDays={setColumnDays} user={user} clickedRecipe={clickedRecipe} setClickedRecipe={setClickedRecipe}
                  />
                ))}
                {provided.placeholder}
              </div>
              </div> 
            )}
          </Droppable>
        );
} else {
  return ( 
    // console.log(columnId)
    // console.log(Object.entries(columnDays))
    <Droppable key={columnId} droppableId={columnId} columnDays={columnDays} setColumnDays={setColumnDays}>
      {(provided, snapshot) => (

        <div className="taskListWrapper"
        ref={provided.innerRef}
        {...provided.droppableProps}
        >
        <div className="columnTitleDiv"><h1 className="columnTitle"> {column.title_day} </h1></div>
          <div className="taskList recipeScroll">
          {clickedRecipe ? <ModalShowRecipeDetails clickedRecipe={clickedRecipe} setColumnDays={setColumnDays} user={user} closeModal={closeModal} /> : null}
          {column?.recipes?.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} columnDays={columnDays} setColumnDays={setColumnDays} user={user} clickedRecipe={clickedRecipe} setClickedRecipe={setClickedRecipe}
            />
          ))}
          {provided.placeholder}
        </div>
        {/* </div> */}
        </div>
      )}
    </Droppable>
  )

}
})}
    </div>
  </div>
</DragDropContext>
</>
  )
}

export default UserRecipePage