import React, { useState, useEffect,  } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';



// import { v4 } from 'uuid'
// import _ from "lodash"


import  './UserRecipePage.css'

function UserRecipePage({setUser, user}) {
//WHERE I AM SETTING STATE
  // const [userRecipes, setUserRecipes] = useState({})
  // const [mealPrepDays, setMealPrepDays] = useState({})


  // function handleDataButton () {
  //   console.log(userRecipes)
  //   userRecipes.map((recipe) => )
  //   console.log(mealPrepDays)
  // }


  // const booksToDisplay = bookList.map((book) => {
  //   return <BookCard key={book.etag} book={book} />;
  // });

    // FETCHING USER RECIPES
  //   useEffect(() => {
  //     fetch(`/users/${user.id}/recipes`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("user recipe:", data)
  //       setUserRecipes(data)
  //     })
  //  },[])

  const [columnDays, setColumnDays] = useState([])

  //FETCH USER'S DAY OF THE WEEK
  useEffect(() => {
    fetch(`/users/${user.id}/days`)
    .then((res) => res.json())
    .then((arrOfDays) => setColumnDays(arrOfDays))
  },[])

  //ALL THE REST OF THE FUNCTIONS FOR THE NEW NEW DRAG AND DROP

  const onDragEnd = (result, columnsDays, setColumnDays) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columnsDays[source.droppableId]
      const destColumn = columnsDays[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumnDays({
        ...columnsDays,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
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
   

  // THIS STUFF NEEDS TO BE CHANGED BELOW 
  // THE ITEMS ARE MAPPING OVER THE RECIPES
  // const item = {
  //   id: v4 (),
  //   name: "Pizza!"
  // }

  //   const item2 = {
  //   id: v4 (),
  //   name: "ButternutSquash!"
  // }

  // const item3 = {
  //   id: v4 (),
  //   name: "PokeBowl!"
  // }
 
  // console.log(item)

  // const [text, setText]=useState('')

  //THIS IS SETTING STATE TO THE "DAYS" BUT I DO NOT HAVE DAYS TO MAP OVER....I ONLY HAVE "MEAL_DAY AS RECIPE"
  // const [stateDays, setStateDays] = useState({
  //   "holding": {
  //     headerColumnTitle: "Recipes",
  //     items:[userRecipes]
  //   },
  //   "sunday": {
  //     headerColumnTitle: "Sunday",
  //     items: []
  //   },
  //   "monday": {
  //     headerColumnTitle: "Monday",
  //     items:[]
  //   },
  //   "tuesday": {
  //     headerColumnTitle: "Tuesday",
  //     items: []
  //   },
  //   "wednesday": {
  //     headerColumnTitle: "Wednesday",
  //     items: []
  //   },
  //   "thursday": {
  //     headerColumnTitle: "Thursday",
  //     items: []
  //   },
  //   "friday": {
  //     headerColumnTitle: "Friday",
  //     items: []
  //   },
  //   "saturday": {
  //     headerColumnTitle: "Saturday",
  //     items: []
  //   },
  // })

  // const handleDragEnd = ({destination, source}) => {

  //   console.log("from", source)
  //   console.log("to", destination)

  //   //Checking if there is no destination. Do nothing. This is for being able to drag outside of any of the destinations
  //   if (!destination) {
  //     return
  //   //this allows to be able to move between items
  //   }
  //   if (destination.index === source.index && destination.droppableId === source.droppableId) {
  //     return
  //   }

//creating a copy of item before removing it from state
//   const itemCopy =  {...stateDays[source.droppableId].items[source.index]}
//   setStateDays(prev => {
//     prev={...prev}
//     //remove from previous items array
//     prev[source.droppableId].items.splice(source.index, 1)
//     //adding to new items array location
//     prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
//     return prev
//   })
// }

// const handleAddItem = () => {
//   setStateDays(prev => {
//     return {
//       ...prev,
//       holding: {
//         headerColumnTitle: "holding",
//         items: [{
//           id: v4(),
//           name: text
//         },...prev.holding.items]
        
//       }
//     }
//   })
// }

// ===== START OF DRAG AND DROP WITH NEW INFORMATION ===== //



//START OF THE RETURN
  return (
<>
<div>This is real</div>

<DragDropContext onDragEnd={result => onDragEnd(result, columnDays, setColumnDays )}>
  <div className="column-container">
    <div className="columnDays">
      {Object.entries(columnDays).map(([columnId, column], index) => {
        return (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div className="taskList"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="columnTitle"> {column.title_day} </h1>
                {column.recipes.map((recipe, index) => (
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


{/* <button onClick={handleDataButton}>Check if UserRecipe SHOWS UP</button>  */}

{/* <h1>What it do</h1>
    <div className="App">
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={handleAddItem}>ADD</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(stateDays, (data, key) => {
          return (
            <div key={key} className="column">
              <h3>{data.headerColumnTitle}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div className="droppable-col"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div  className={`item ${snapshot.isDragging && "dragging"}`}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
 
        })}
      </DragDropContext>
    </div> */}

</>
  )
}

export default UserRecipePage