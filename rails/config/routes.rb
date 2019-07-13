Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "users#index"

  get "register" => "users#new"
  resources :users
  post "register" => "users#create"

  get "login" => "sessions#new"
  post "login" => "sessions#create"

  get "welcome" => "sessions#welcome"

  get "logout" => "sessions#destroy"

end
