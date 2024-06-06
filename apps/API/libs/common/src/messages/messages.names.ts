export enum AuthMessage {
  VALIDATE_USER = 'validate_user',
  GET_CURRENT_USER = 'get_current_user',
  SIGNIN_USER = 'signin_user',
}

export enum ClientMessage {
  CREATE_CLIENT = 'create_client',
  GET_CLIENTS = 'get_clients',
  GET_CLIENT = 'get_client',
  UPDATE_CLIENT = 'update_client',
  DELETE_CLIENT = 'delete_client',
}

export enum RestaurantMessage {
  CREATE_RESTAURANT = 'create_restaurant',
  GET_RESTAURANTS = 'get_restaurants',
  GET_RESTAURANT = 'get_restaurant',
  UPDATE_RESTAURANT = 'update_restaurant',
  DELETE_RESTAURANT = 'delete_restaurant',
}
