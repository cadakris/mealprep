class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :bio, :image, :password_digest

  # has_many :days
end
