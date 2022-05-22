import React, { useState, useEffect,  } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

import  './UserRecipePage.css'

//DEFAULT FORM INFORMATION TO PLUG INTO STATE FOR THE FORM
const defaultFormState = {
      recipe_name: "",
      ingredients: "",
      instructions: "",
      comment: ""
    }

function UserRecipePage({setUser, user}) {
//set columndays gets the data - title, description, the columns etc. 
  const [columnDays, setColumnDays] = useState([])
  const [formData, setFormData] = useState(defaultFormState)

  //FORM POSTING
  function handleFormSubmit(e){
    e.preventDefault()
  
    fetch(`/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((recipeObj) => {
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
      }
    )}

  //HANDLING FORM INPUTS
function handleChange (e) {
  setFormData({
    ...formData, [e.target.name]: e.target.value,
  })
}


  // FETCH USER'S DAY OF THE WEEK
  useEffect(() => {
    fetch(`/users/${user.id}/days`)
    .then((res) => res.json())
    .then((arrOfDays) => setColumnDays(arrOfDays))
  },[])
  


  
  //ALL THE REST OF THE FUNCTIONS FOR THE NEW NEW DRAG AND DROP

  // const [list, setList] = useState([()])

  const onDragEnd = (result, columnsDays, setColumnDays) => {
    console.log("columnDays:", columnDays)
    console.log("result:", result)
    if (!result.destination) return
    //destruction result into source ad destiation
    const { source, destination} = result
    console.log(result.draggableID)
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
      console.log("new state of column days:", columnDays)
      console.log("day_id:", destination.droppableId)

    // UPDATE TO CHANGE ON THE BACKEND
      fetch(`/users/${user.id}/days`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          day_id: `${destination.droppableId}`
        })
      })
      .then(response => response.json())
      .then(newData => console.log(newData))


    //THIS IS FOR WHEN WE ARE REARRANGING THE INDEX WITHIN THE COLUMN
    } else {
      const column = columnsDays[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumnDays({
        ...columnsDays,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  // const handleAddItem = () => {
  //   setStateDays(prev => {
  //     return {
  //       ...prev,
  //       holding: {
  //         headerColumnTitle: "holding",
  //         items: [{
  //           id: ,
  //           name: text
  //         },...prev.holding.items]
          
  //       }
  //     }
  //   })
  // }
  
  // ________END OF KEEP THIS CODE

  

//START OF THE RETURN
  return (
<>
<div>This is real</div>

{/* value={text} onChange={(e) => setText(e.target.value)} */}

<div>
  <form onSubmit={handleFormSubmit}>
    <label>Recipe Name</label>
      <input 
        type="text"
        name="recipe_name"
        onChange={handleChange}
      ></input>
    <label>Igredients</label>
      <textarea 
        type="textarea"
        name="ingredients"
        onChange={handleChange}
      ></textarea>
    <label>Instructions</label>
      <textarea 
        type="textarea"
        name="instructions"
        onChange={handleChange}
      ></textarea>
    <label>Comments</label>
      <textarea 
        type="textarea"
        name="comment"
        onChange={handleChange}
      ></textarea>  
      <button>ADD</button>
  </form>
</div>

<DragDropContext onDragEnd={result => onDragEnd(result, columnDays, setColumnDays )}>
  <div className="column-container">
    <div className="columnDays">
      {Object.entries(columnDays).map(([columnId, column], index) => {
        return ( 
          // console.log(columnId)
          // console.log(Object.entries(columnDays))
          <Droppable key={columnId} droppableId={columnId} columnDays={columnDays} setColumnDays={setColumnDays}>
            {(provided, snapshot) => (
              <div className="taskList"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="columnTitle"> {column.title_day} </h1>
                {column?.recipes?.map((recipe, index) => (
                  <TaskCard key={recipe.id} recipe={recipe} index={index}  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  </div>
</DragDropContext>

{/* END OF KEEP THIS CODE HERE */}



</>
  )
}

export default UserRecipePage