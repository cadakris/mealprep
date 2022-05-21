Rails.application.routes.draw do
  
  resources :days
  resources :meal_recipe_days
  resources :meal_days
  resources :recipes
  resources :users

  # resources :users, only: [:show, :index] do
  #   resources :recipes, only: [:index, :show]
  #   resources :meal_days, only: [:index, :show]
  # end

  resources :users, only: [:show, :index] do
    resources :days, only: [:index, :show]
  end

  resources :users, only: [:show, :index] do
    resources :recipes, only: [:index, :show]
  end



  # get "/users_days_recipes", to: "days#users_days"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
