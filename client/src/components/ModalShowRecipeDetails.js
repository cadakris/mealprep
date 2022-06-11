import React, { useState } from 'react'
import Axios from 'axios'
import { GrClose } from "react-icons/gr"

function ModalShowRecipeDetails({clickedRecipe, closeModal, user, setColumnDays}) {

    const valIngredients = clickedRecipe.ingredients
    const valDirections = clickedRecipe.instructions
    const commentVal = clickedRecipe.comment

    const defaultIngredientFormEdit = {
            ingredients: valIngredients.join("\n"),
            instructions: valDirections.join("\n"),
            comment: commentVal,
            recipe_name: clickedRecipe.recipe_name
    }

    const [formData, setFormData] = useState(defaultIngredientFormEdit)
    const [imageInfo, setImageInfo] = useState("")
    const [imageSelected, setImageSelected] = useState('')

//HANDLE ALL ONCHANGES
    function handleFormChanges (e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

// HANDLE ENTIRE SUBMIT FOR EACH CATEGORY 
function handleRecipeFormSubmit (e) {
    e.preventDefault()

    fetch(`/recipes/${clickedRecipe.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            ingredients: [formData.ingredients],
            instructions: [formData.instructions],
            comment: formData.comment,
            recipe_name: formData.recipe_name
        })
    })
    .then((res) => res.json())
    .then((updatedRecipeData) => {
        setFormData(updatedRecipeData)
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
                <form onSubmit={handleRecipeFormSubmit}>
                    <textarea className="grid-item1">
                        <div contenteditable="true"
                            onInput={handleFormChanges}
                            name="recipe_name"
                            value={formData.ingredients}
                        >{formData.recipe_name}</textarea>
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
                                name="ingredients"
                                className="longTextArea"
                                value={formData.ingredients}
                                rows={20}
                                onChange={handleFormChanges}
                                onKeyDown={onKeyDown}
                            ></textarea></div>
                        </div>

                    <div className="grid-item3">
                        <div><label className="containerLabel">DIRECTIONS</label></div>
                            <div><textarea
                                name="instructions"
                                className="longTextArea"
                                value={formData.instructions}
                                rows={20}
                                onChange={handleFormChanges}
                                onKeyDown={onKeyDown}
                            ></textarea></div>
                    </div>

                    <button className="modalButton"> Save </button>

                    <div className="grid-item4">
                        <div><label className="containerLabel">COMMENTS</label></div>
                            <div><textarea
                                name="comment"
                                className="commentTextArea"
                                value={formData.comment}
                                rows={6}
                                onChange={handleFormChanges}
                                onKeyDown={onKeyDown}
                            ></textarea></div>
                    </div>

                    <div className="grid-item5">
                            <div className="modalImgContainer">
                                <img src={imageInfo? imageInfo : clickedRecipe.image_url }></img>
                            </div>
                    </div> 
                    </form>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default ModalShowRecipeDetails