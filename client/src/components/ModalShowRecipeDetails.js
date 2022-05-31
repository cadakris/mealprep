import React, { useState } from 'react'
import Axios from 'axios'
import { Image } from 'cloudinary-react'
import axios from 'axios'

function ModalShowRecipeDetails({clickedRecipe}) {

    const valIngredients = clickedRecipe.ingredients
    const valDirections = clickedRecipe.instructions
    const commentVal = clickedRecipe.comment

    const [editIngredientValue, setEditIngredientValue] = useState(valIngredients.join("\n"))
    const [editDirectionsValue, setEditDirectionsValue] = useState(valDirections.join("\n"))
    const [editComments, setEditComments] = useState(commentVal)
    const [imageSelected, setImageSelected] = useState("")
    const [imageInfo, setImageInfo] = useState("")


// HANDLE DIFFERENT ON CHANGES
    function onIngredientChange (e) {
        setEditIngredientValue(e.target.value)
    }

    function onDirectionsChange (e) {
        setEditDirectionsValue(e.target.value)
    }

    function onCommentChange (e) {
        setEditComments(e.target.value)
    }

// INGREDIENT HANDLESAVECLICK
    function handleIngredientSaveClick (e) {
        e.preventDefault()
        //THIS MAKES IT INTO AN ARRAY
        const newIngredientsArray = editIngredientValue.split("\n")
        console.log(newIngredientsArray)

        fetch(`/recipes/${clickedRecipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({"ingredients": newIngredientsArray}),
        })
        .then((res) => res.json())
        .then((newIngredientsArray) => {
            console.log(newIngredientsArray)
        })}


    const onKeyDown = (e) => {
        const keyCode = e.which || e.keyCode;
        if (e.key === 13) {
          console.log("enter")
        }
        // 13 represents the Enter key
        else if (keyCode === 13 && e.shiftKey) {
            // Don't generate a new line
            console.log("shift and enter key")
      } 
    }

    
// DIRECTIONS HANDLESAVECLICK
function handleDirectionsSaveClick (e) {
    e.preventDefault()

    const newDirectionsArray = editDirectionsValue.split("\n")

    fetch(`/recipes/${clickedRecipe.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({"instructions": newDirectionsArray}),
    })
    .then((res) => res.json())
    .then((newDirectionsArray) => {
        console.log(newDirectionsArray)
    })}

// COMMENTS HANDLESAVECLICK
    function handleCommentsSaveClick (e) {
        e.preventDefault()
    
        fetch(`/recipes/${clickedRecipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({"comment": editComments}),
        })
        .then((res) => res.json())
        .then((newDirectionsArray) => {
            console.log()
        })}

//UPLOAD PHOTO FROM CLOUDINARY // MAKING AXIOS POST REQUEST
 const uploadImage = (files) => {
     const formData = new FormData()
     formData.append("file", files[0])
     formData.append("upload_preset", "mafnci9q")

    Axios.post("https://api.cloudinary.com/v1_1/dnr8dgxt2/image/upload", formData)
    .then((imageData) => {
        console.log("image url",imageData.data.url)
        setImageInfo(imageData.data.url)
    })
 };

 function submittingImage () {
    fetch(`/recipes/${clickedRecipe.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            Accept: "application/json",
        },
        body: JSON.stringify({image_url: imageInfo}),
    })
    .then ((res) => res.json())
    .then((newImageUrlInfo) => setImageSelected(newImageUrlInfo))
 }

  return (
    <div className="modal-background-mask">
        <div className="modal">
            <div className="contentWrapper scroll">
                <div className="grid-container">
                    <div className="grid-item1">
                        <p>{clickedRecipe.recipe_name}</p>
                    </div>
                        <div className="grid-item2">
                            <label>INGREDIENTS</label>
                            <textarea
                                value={editIngredientValue}
                                rows={25}
                                onChange={onIngredientChange}
                                onKeyDown={onKeyDown}
                            ></textarea>

                            <button onClick={handleIngredientSaveClick}>Save</button>
                        </div>

                    <div className="grid-item3">
                        <label>DIRECTIONS</label>
                            <textarea
                                value={editDirectionsValue}
                                rows={25}
                                onChange={onDirectionsChange}
                                onKeyDown={onKeyDown}
                            ></textarea>
                        <button onClick={handleDirectionsSaveClick}>Save</button>
                    </div>

                    <div className="grid-item4">
                        <label>COMMENTS</label>
                            <textarea
                                value={editComments}
                                rows={25}
                                onChange={onCommentChange}
                                onKeyDown={onKeyDown}
                            ></textarea>
                        <button onClick={handleCommentsSaveClick}>Save</button>
                        <input
                          type="file"
                          onChange={(e) => {
                              uploadImage(e.target.files)}}
                        ></input>   
                        <button onClick={submittingImage}> Upload An Image</button> 

                        <div className="displayImage">
                            <img src={clickedRecipe.image_url}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default ModalShowRecipeDetails