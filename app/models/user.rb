class User < ApplicationRecord
    has_secure_password

    has_many :meal_days, dependent: :destroy
    has_many :recipes, through: :meal_days

    validates :full_name, presence: true
end
