class Parent < ApplicationRecord
  has_many :children

  accepts_nested_attributes_for :children, reject_if: :all_blank, allow_destroy: true

  LIMIT_NUMBER_OF_CHILDREN = 5
end
