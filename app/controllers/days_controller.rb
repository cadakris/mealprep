class DaysController < ApplicationController

#GET / all the days (with recipes attached)
def index
    render json: Day.all
end

#GET / day/id
def show
    day = Day.find_by(id: params[:id])
    render json: day
end

def update
    day = Day.find_by(id: params[:id])
    if day
        day.update(recipe_params)
        render json: day
    else
        render json: { error: "Not Found"}, status: :not_found
    end
end


private
def day_params
    params.permit(:user_id, :title_day)
end

def recipe_params
    params.permit(:recipe_name, :ingredients, :instructions, :categories, :comment)
end

end
