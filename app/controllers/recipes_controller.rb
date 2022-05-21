class RecipesController < ApplicationController

# GET / Show all the users recipes
def show
    recipe = Recipe.find_by(id: session[:user_id])
    render json: recipe
end

# GET / all user recipe iwth regular user_id
def index
    if params[:user_id]
        user = User.find(params[:user_id])
        recipes = user.recipes
    else
        recipes = Recipe.all
    end
        render json: recipes, include: :user
end    

# GET / NOT FOR NESTED ROUTES
# def index
#     render json: Recipe.all
# end

# POST / new recipe
def create
    newRecipe = Recipe.create!(recipe_params)
    render json: newRecipe, status: :created
end


private

def recipe_params
    params.permit(:recipe_name, :ingredients, :instructions, :categories, :comment)
end

end
