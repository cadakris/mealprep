Rails.application.routes.draw do
  
  resources :days
  resources :meal_recipe_days
  resources :meal_days
  resources :recipes
  resources :users


  resources :users, only: [:show, :index, :update] do
    resources :days, only: [:index, :show, :create, :update] do
      resources :recipes, only: [:create, :show, :update]
    end
  end

  resources :days, only: [:index, :show, :create, :update] do
    resources :meal_recipe_days, only: [:index, :create, :show, :update]
  end

  
    resources :recipes, only: [:create, :show, :update, :index] do 
      resources :days, only: [:index, :show, :create, :update]
    end
  

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get "/user/:id", to: "users#getsuser"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
