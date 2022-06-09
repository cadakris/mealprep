import React, { useState } from 'react'
import Axios from 'axios'
import { GrClose } from "react-icons/gr"

function ModalShowRecipeDetails({clickedRecipe, closeModal, user, setColumnDays, setClickedRecipe}) {

    const valIngredients = clickedRecipe.ingredients
    const valDirections = clickedRecipe.instructions
    const commentVal = clickedRecipe.comment

    const [editIngredientValue, setEditIngredientValue] = useState(valIngredients.join("\n"))
    const [editDirectionsValue, setEditDirectionsValue] = useState(valDirections.join("\n"))
    const [editComments, setEditComments] = useState(commentVal)
    const [imageInfo, setImageInfo] = useState("")
    const [imageSelected, setImageSelected] = useState('')


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

        fetch(`/recipes/${clickedRecipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({"ingredients": [editIngredientValue]}),
        })
        .then((res) => res.json())
        .then((newIngredientsData) => {
            setEditIngredientValue(newIngredientsData.ingredients)
            // setClickedRecipe(newIngredientsData)
        })
        .then(() => {
            fetch(`/users/${user.id}/days`)
            .then((res) => res.json())
            .then((arrOfDays) => setColumnDays(arrOfDays))
        })
    }


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

    fetch(`/recipes/${clickedRecipe.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({"instructions": [editDirectionsValue]}),
    })
    .then((res) => res.json())
    .then((newDirectionsData) => {
        setEditDirectionsValue(newDirectionsData.instructions)

    })
    .then(() => {
        fetch(`/users/${user.id}/days`)
        .then((res) => res.json())
        .then((arrOfDays) => setColumnDays(arrOfDays))
    })
}

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
        .then((newCommentsData) => {
            setEditComments(newCommentsData.comment)
        })
        .then(() => {
            fetch(`/users/${user.id}/days`)
            .then((res) => res.json())
            .then((arrOfDays) => setColumnDays(arrOfDays))
        })
    }

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
    .then((newImageUrlInfo) => {setImageSelected(newImageUrlInfo)})
    .then(() => {
        fetch(`/users/${user.id}/days`)
        .then((res) => res.json())
        .then((arrOfDays) => setColumnDays(arrOfDays))
    })
 }

 
 return (
     <div className="modal-background-mask">
        <div className="modal">
            <div className="contentWrapper scroll">
            <button className="closeModalButton" onClick={closeModal}><GrClose/></button>
                <div className="grid-container">
                    <div className="grid-item1">
                        <h1>{clickedRecipe.recipe_name}</h1>
                        <h4>Upload A Photo</h4>
                        <input
                          type="file"
                          onChange={(e) => {
                              uploadImage(e.target.files)}}
                        ></input>  
                        <div><button className="modalButton" onClick={submittingImage}> Save Image</button></div>
                    </div>
                        <div className="grid-item2">
                            <div><label className="containerLabel">INGREDIENTS</label></div>
                            <div><textarea
                                className="longTextArea"
                                value={editIngredientValue}
                                rows={20}
                                onChange={onIngredientChange}
                                onKeyDown={onKeyDown}
                            ></textarea></div>

                            <button className="modalButton" onClick={handleIngredientSaveClick}>Save</button>
                        </div>

                    <div className="grid-item3">
                        <div><label className="containerLabel">DIRECTIONS</label></div>
                            <div><textarea
                                className="longTextArea"
                                value={editDirectionsValue}
                                rows={20}
                                onChange={onDirectionsChange}
                                onKeyDown={onKeyDown}
                            ></textarea></div>
                        <button className="modalButton" onClick={handleDirectionsSaveClick}>Save</button>
                    </div>

                    <div className="grid-item4">
                        <div><label className="containerLabel">COMMENTS</label></div>
                            <div><textarea
                                className="commentTextArea"
                                value={editComments}
                                rows={6}
                                onChange={onCommentChange}
                                onKeyDown={onKeyDown}
                            ></textarea></div>
                        <button className="modalButton" onClick={handleCommentsSaveClick}>Save</button>
                    </div>

                    <div className="grid-item5">
                            <div className="modalImgContainer">
                                <img src={imageInfo? imageInfo : clickedRecipe.image_url }></img>
                            </div>
                    </div> 
                </div>
            </div>
        </div>      
    </div>
  )
}

export default ModalShowRecipeDetails