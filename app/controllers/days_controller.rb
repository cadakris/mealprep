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
        session[:user_id] = user.id
        render json: day, status: :created
    end



    private
    def day_params
        params.permit(:user_id, :title_day)
    end
end
