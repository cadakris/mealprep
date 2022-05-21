class UsersController < ApplicationController

    def index
        render json: User.all
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    # def show
    #     user = User.find_by(id: session[:user_id])
    #     render json: user
    # end

    private

    def user_params
        params.permit(:full_name, :username, :password, :password_confirmation)
    end

end