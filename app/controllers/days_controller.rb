class DaysController < ApplicationController

#GET / all the days (with recipes attached)
def index
    render json: Day.all
end

# GET / find days of logged in user: 
# days/user_id
# def users_days
#     users_day = Day.where(user_id: params[:user_id])
#     render json: users_day
# end

#GET / day/id
    def show
        day = Day.find_by(id: params[:id])
        render json: day
    end

#POST / day
    def create
        day = Day.create!(day_params)
        Recipe.create!(recipe_params)
        render json: day, status: :created
    end



    private
    def day_params
        params.permit(:user_id, :title_day)
    end

    def recipe_params
        params.permit(:recipe_name, :ingredients, :instructions, :categories, :comment)
    end

end
