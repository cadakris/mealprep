class Day < ApplicationRecord
    has_many :meal_recipe_days
    has_many :recipes, through: :meal_recipe_days

    belongs_to :user
end
