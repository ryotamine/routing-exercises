Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "rails_users#index"
  get "/register" => "rails_users#register"
  get "/login" => "rails_users#login"
end
