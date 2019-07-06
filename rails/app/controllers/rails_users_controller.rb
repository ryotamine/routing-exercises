class RailsUsersController < ApplicationController
  def index
    @users = RailsUser.order(id: :desc).all
  end

  def new
  end

  def create
    @user = RailsUser.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to "/welcome"
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password
    )
  end
end
