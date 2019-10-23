class SampleController < ApplicationController
  def index
  end

  def download
    send_file Rails.root.join('public', 'sample_file.txt'), filename: 'sample_file.txt'
  end
end
