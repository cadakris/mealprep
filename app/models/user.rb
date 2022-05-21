class User < ApplicationRecord
    has_secure_password

    has_many :days

    validates :full_name, presence: true
end
