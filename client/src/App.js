import React, { useState, useEffect,  } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import _ from "lodash"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 } from 'uuid'


import LandingPage from './components/LandingPage'
import UserRecipePage from './components/UserRecipePage'


function App() {
  const [user, setUser] = useState(null);


  //LOGIN
  useEffect(() => {
    fetch(`/me`)
      .then((res) => res.json())
      .then((userObj) => {
        console.log("logged in", userObj);

        if (userObj.username) {
          setUser(userObj);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);


  // THIS STUFF NEEDS TO BE CHANGED BELOW //

  const item = {
    id: v4 (),
    name: "Pizza!"
  }

    const item2 = {
    id: v4 (),
    name: "ButternutSquash!"
  }

  const item3 = {
    id: v4 (),
    name: "PokeBowl!"
  }
 
  console.log(item)

  const [text, setText]=useState('')
  const [stateDays, setStateDays] = useState({
    "holding": {
      headerColumnTitle: "Recipes",
      items:[item]
    },
    "sunday": {
      headerColumnTitle: "Sunday",
      items: [item2, item3]
    },
    "monday": {
      headerColumnTitle: "Monday",
      items:[]
    }
  })

  const handleDragEnd = ({destination, source}) => {

    console.log("from", source)
    console.log("to", destination)

    //Checking if there is no destination. Do nothing. This is for being able to drag outside of any of the destinations
    if (!destination) {
      return
    //this allows to be able to move between items
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

//creating a copy of item before removing it from state
  const itemCopy =  {...stateDays[source.droppableId].items[source.index]}
  setStateDays(prev => {
    prev={...prev}
    //remove from previous items array
    prev[source.droppableId].items.splice(source.index, 1)
    //adding to new items array location
    prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
    return prev
  })
}

const handleAddItem = () => {
  setStateDays(prev => {
    return {
      ...prev,
      holding: {
        headerColumnTitle: "holding",
        items: [{
          id: v4(),
          name: text
        },...prev.holding.items]
        
      }
    }
  })
}

//START OF RETURN
  return (
<div className="landingPage">

<BrowserRouter>
  <Routes>
    <Route
        path="/"
        element={
          <LandingPage setUser={setUser}/>}
    ></Route>

    <Route
      path="/user-recipe-page"
      element={<UserRecipePage/>}
  
    ></Route>
  </Routes>
</BrowserRouter>



{/* 

<h1>What it do</h1>
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

</div>
  );
}

export default App;
