class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :recipe_name, :ingredients, :instructions, :categories, :comment
  
end
