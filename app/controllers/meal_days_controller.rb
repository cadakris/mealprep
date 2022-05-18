class MealDaysController < ApplicationController
    belongs_to :recipe
    belongs_to :user
end
