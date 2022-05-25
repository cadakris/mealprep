class UsersController < ApplicationController

#GET 
    def show
        user = User.find_by!(id: session[:user_id])
        render json: user
    end    

    def index
        render json: User.all
    end

    def getsuser
        user = User.find_by!(id: params[:id])
        render json: user
    end

#POST 
    def create
        
        user = User.create!(user_params)
        # save user's ID in the session hash
        session[:user_id] = user.id
        Day.create!(title_day: 'Recipes', user_id: user.id)
        Day.create!(title_day: 'Monday', user_id: user.id)
        Day.create!(title_day: 'Tuesday', user_id: user.id)
        Day.create!(title_day: 'Wednesday', user_id: user.id)
        Day.create!(title_day: 'Thursday', user_id: user.id)
        Day.create!(title_day: 'Friday', user_id: user.id)
        Day.create!(title_day: 'Saturday', user_id: user.id)
        Day.create!(title_day: 'Sunday', user_id: user.id)


        render json: user, status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user
    end

    private

    def user_params
        params.permit(:full_name, :username, :password, :password_confirmation)
    end

end
