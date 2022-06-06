class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :bio, :image, :password_digest, :email_address

  has_many :days
  
end
