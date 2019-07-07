class RailsLoginsController < ApplicationController
  def index
    @logins = RailsLogin.order(id: :desc).all
  end

  def new
  end

  def create
    if (user = RailsUser.authenticate_with_credentials(params[:email], params[:password]))
      session[:user_id] = user.id
      redirect_to "/welcome"
    else
      redirect_to "/login"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end
end
