class RailsLoginsController < ApplicationController

  def new
  end

  def create
    redirect_to "/welcome"
  end

  def destroy
    redirect_to "/"
  end

end
