class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :recipe_name
      t.string :ingredients, array: true
      t.string :instructions, array: true
      t.string :categories
      t.string :comment
      t.string :image_url

      t.timestamps
    end
  end
end
