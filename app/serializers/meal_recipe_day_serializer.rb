class MealRecipeDaySerializer < ActiveModel::Serializer
  attributes :id, :recipe_id, :day_id

  belongs_to :day
  belongs_to :recipe
end
