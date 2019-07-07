class CreateRailsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :rails_users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.timestamps null: false
    end
  end
end
