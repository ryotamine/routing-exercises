Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "rails_users#index"
  get "/register" => "rails_users#register"
  post "/register" => "rails_users#create"
  get "/login" => "rails_users#login"
  post "/login" => "rails_users#create"
  get "/welcome" => "rails_users#welcome"
  get "/logout" => "rails_logins#destroy"
end
