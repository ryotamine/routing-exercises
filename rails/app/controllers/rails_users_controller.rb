class RailsUsersController < ApplicationController

  def new
  end

  def create
    redirect_to "/welcome"
  end

end
