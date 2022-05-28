import React from 'react'
import "./ServicesPage.css"

function ServicesPage() {
  return (
      <>
        <div className="servicePageContainer">
            <div className="contentServicePageWrapper">
                <div className="grid-container-services">
                    <div className="grid-item1-service">
                        <h1> Create Digital <br /> Recipes </h1>
                        <p className="landingText"> Keep all of your recipes in one place for easy access and views</p>
                    </div>
                    <div className="grid-item2-service">
                        <div className="imgContainer">
                            <img className="digialRecipeImg" src="https://fabulousarizona.com/wp-content/uploads/sites/2/2020/04/certistar-digital-recipe-book.jpg" alt="Digital Recipe"></img>
                        </div>
                    </div>

                    <div className="grid-item3-service">
                        <div className="imgContainer">
                            <img className="foodContainersImg"src="https://www.sdentertainer.com/wp-content/uploads/ella-olsson-lMcRyBx4G50-unsplash-scaled.jpg" alt="Food in meal prep containers"></img>
                        </div>
                    </div>

                    <div className="grid-item4-service">
                        <h1>Meal Prep Food <br /> For The Week!</h1>
                        <p className="landingText"> Use the recipes you created to create a meal prep plan for the week. </p>
                    </div>

                </div>
            </div>
        </div>
      </>
  )
}

export default ServicesPage