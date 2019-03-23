class CreateChildren < ActiveRecord::Migration[5.2]
  def change
    create_table :children do |t|
      t.integer :parent_id
      t.string :code
      t.string :name

      t.timestamps
    end
  end
end
