class CreateDays < ActiveRecord::Migration[6.1]
  def change
    create_table :days do |t|
      t.integer :user_id
      t.string :title_day

      t.timestamps
    end
  end
end
