class RecipesController < ApplicationController

# GET / Show all the users recipes
    def show
        recipe = find_recipe
        render json: recipe
    end


# GET / NOT FOR NESTED ROUTES
    def index
        render json: Recipe.all
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

private
    def recipe_params
        params.permit(:recipe_name, :ingredients, :instructions, :categories, :comment)
    end

    def find_recipe
        Recipe.find_by!(id: params[:id])
    end

end
