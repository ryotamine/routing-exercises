class RailsUser < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :password, presence: true, length: { minimum: 8, maximum: 32 }
  has_secure_password

  def self.authenticate_with_credentials(email, password)
    user_found = RailsUser.find_by email: email
    if user_found && user_found.authenticate(password)
      user_found
    else
      nil
    end
  end
end
