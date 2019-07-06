class CreateRailsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :rails_users do |t|

      t.timestamps
    end
  end
end
