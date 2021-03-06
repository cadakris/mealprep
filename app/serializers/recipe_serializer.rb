class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :recipe_name, :ingredients, :instructions, :categories, :comment, :image_url

  has_many :meal_recipe_days
  has_many :days
end
