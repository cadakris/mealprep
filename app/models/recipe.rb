class Recipe < ApplicationRecord
    has_many :meal_recipe_days
    has_many :days, through: :meal_recipe_days
end
