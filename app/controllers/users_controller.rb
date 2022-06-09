class UsersController < ApplicationController

#GET # if User authenticated, return user obj
# def show
#     current_user = User.find_by(id: session[:user_id])
#     if current_user
#       render json: current_user
#     else
#       render json: { error: 'Not authorized' }, status: :unauthorized
#     end
#   end  

    def index
        render json: User.all
    end


    def update
        current_user = User.find_by!(id: session[:user_id])
        if current_user
            current_user.update!(user_params)
            render json: current_user
        else
            render json: { error: "Not Found"}, status: :not_found
        end
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
        user = User.find_by!(id: session[:user_id])
        render json: user
    end

    private

    def user_params
        params.permit(:full_name, :username, :password, :password_confirmation, :bio, :image, :email_address)
    end

end
