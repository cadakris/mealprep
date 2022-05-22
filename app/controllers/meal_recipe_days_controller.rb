class MealRecipeDaysController < ApplicationController
    def index
        render json: MealRecipeDay.all
    end

    def show
        mealRecipeDay = MealRecipeDay.find_by!(id: params[:id])
        render json: mealRecipeDay
    end

    def create
        newMealRecipe = MealRecipeDay.create!(params.permit(:day_id, :recipe_id))
        render json: newMealRecipe, status: :created
    end

    def destroy
        deleteMealeRecipeDay = MealRecipeDay.find_by!(id: params[:id])
        deleteMealeRecipeDay.destroy
        render json:{}
    end

    # def update
    #     mealRecipeDay = MealRecipeDay.find_by(id: params[:id])
    #     mealRecipeDay.update(params.permit(:day_id, :recipe_id))
    #     render json: mealRecipeDay
    # end

    def update
        mealRecipeDay = MealRecipeDay.find_by(id: params[:id])
        if mealRecipeDay
            mealRecipeDay.update(params.permit(:day_id, :recipe_id))
            render json: mealRecipeDay
        else
            render json: { error: "Not Found"}, status: :not_found
        end
    end
end
