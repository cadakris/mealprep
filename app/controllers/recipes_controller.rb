class RecipesController < ApplicationController

    before_action :find_recipe, only: [:show, :update, :destroy]
    

# GET / Show all the users recipes
    def show
        recipe = find_recipe
        render json: recipe
    end


# GET / NOT FOR NESTED ROUTES
    def index
       
        render json: Recipe.all
    end

# GET 
    def show
        recipe = find_recipe
        render json: recipe
    end

# POST / new recipe
    def create
        newRecipe = Recipe.create!(recipe_params)
        render json: newRecipe, status: :created
    end

#DELETE / delete recipe
    def destroy
        deleteRecipe = find_recipe
        deleteRecipe.destroy
        render json: {}
    end

#UPDATE / 
    def update
        
        
        updatedRecipe = @recipe.update!(recipe_params)
        render json: updatedRecipe, status: :ok
        
    end


private
    def recipe_params
        params.permit(:recipe_name, :categories, :comment, ingredients: [],  instructions:[])
    end

    def find_recipe
        @recipe = Recipe.find_by!(id: params[:id])
    end

end
