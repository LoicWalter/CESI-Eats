export enum AuthMessage {
  VALIDATE_USER = 'validate_user',
  GET_CURRENT_USER = 'get_current_user',
  SIGNIN_USER = 'signin_user',
}

export enum UserMessage {
  CREATE_USER = 'create_user',
  EDIT_USER = 'edit_user',
}

export enum RestaurantMessage {
  CREATE_RESTAURANT = 'create_restaurant',
  GET_RESTAURANTS = 'get_restaurants',
  GET_RESTAURANT = 'get_restaurant',
  EDIT_RESTAURANT = 'edit_restaurant',
  DELETE_RESTAURANT = 'delete_restaurant',
}
