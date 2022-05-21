class RecipesController < ApplicationController

# GET / all user recipe
def index
    if params[:user_id]
        user = User.find(params[:user_id])
        recipes = user.recipes
    else
        recipes = Recipe.all
    end
        render json: recipes, include: :user
end    

# def index
#     render json: Recipe.all
# end

def show
    recipe = Recipe.find_by(id: session[:user_id])
    render json: recipe
end

end
