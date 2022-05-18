class MealDaySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipe_id, :meal_prep_day
end
