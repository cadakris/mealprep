class DaySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title_day

  has_many :recipes
end
