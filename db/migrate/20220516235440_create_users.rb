class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :username
      t.string :email_address
      t.string :bio
      t.string :image
      t.string :password_digest

      t.timestamps
    end
  end
end
