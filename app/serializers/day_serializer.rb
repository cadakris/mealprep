class DaySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title_day

  belongs_to :user
  has_many :meal_recipe_days
  has_many :recipes
end
