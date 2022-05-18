class CreateMealDays < ActiveRecord::Migration[6.1]
  def change
    create_table :meal_days do |t|
      t.integer :user_id
      t.integer :recipe_id
      t.string :meal_prep_day

      t.timestamps
    end
  end
end
