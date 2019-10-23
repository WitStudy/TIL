Rails.application.routes.draw do
  root 'sample#index'

  get 'sample/index'
  get 'sample/download'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
