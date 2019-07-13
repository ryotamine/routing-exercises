class User < ApplicationRecord

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
  validates :password, presence: true, length: { minimum: 8, maximum: 32 }
  has_secure_password
  
end
