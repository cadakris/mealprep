class CreateMealRecipeDays < ActiveRecord::Migration[6.1]
  def change
    create_table :meal_recipe_days do |t|
      t.integer :recipe_id
      t.integer :day_id

      t.timestamps
    end
  end
end
