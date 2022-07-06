import Select from 'react-select'
import React from 'react'

function SearchRecipe({recipeInfo, setRecipeInfo, columnDays, setClickedRecipe}) {

//This uses the data and creates an array of objects for react-select
  const searchList = columnDays.map((day) => day.recipes.map((recipe) =>  ([{label: recipe.recipe_name, value: recipe.id }]))).flat()
  //This filters out any days that do not have any recipes
    let filteredList = searchList.filter(list => list.length !==0)
    let userRecipeDropdownList = [].concat(...filteredList)

//Get request to be able to find specific recipe clicked on
const handleChange = (e) => {
    fetch(`recipes/${e.value}`)
    .then((res) => res.json())
    .then((dropdownClickedValue) => setClickedRecipe(dropdownClickedValue))
}

const selectStyles = {
    menuList: styles => {
      console.log('menuList:', styles);
      return {
        ...styles,
        maxHeight: 136,
        fontSize: 16,
        fontFamily: 'Arial'
      }; 
    }
  };


  return (
    <>
        <div className="searchBarContainer">
            <Select className="searchBar"
             placeholder="Search"
             options={userRecipeDropdownList}
             onChange={handleChange}
             styles={selectStyles}
            />
        </div>
    </>
  )
}

export default SearchRecipe