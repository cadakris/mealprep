class Recipe < ApplicationRecord
    has_many :meal_days, dependent: :destroy
    has_many :users, through: :meal_days
end
