export enum AuthMessage {
  VALIDATE_USER = 'validate_user',
  GET_CURRENT_USER = 'get_current_user',
  SIGNIN_USER = 'signin_user',
  VALIDATE_API_KEY = 'validate_api_key',
}

export enum UserMessage {
  CREATE_USER = 'create_user',
  EDIT_USER = 'edit_user',
  GET_USER = 'get_user',
  GET_ALL_USERS = 'get_all_users',
  DELETE_USER = 'delete_user',
}

export enum OrderMessage {
  CREATE_ORDER = 'create_order',
  GET_ORDERS = 'get_orders',
  GET_ORDER = 'get_order',
  GET_RECEIVED_ORDER = 'get_received_order',
  GET_RECEIVED_ORDERS = 'get_received_orders',
  EDIT_ORDER = 'edit_order',
  EDIT_ORDER_STATUS = 'edit_order_status',
  DELETE_ORDER = 'delete_order',
}

export enum DeliveryMessage {
  CREATE_DELIVERY = 'create_delivery',
  ACCEPT_DELIVERY = 'accept_delivery',
  GET_DELIVERY_ORDER = 'get_delivery_order',
  GET_DELIVERY_ORDERS = 'get_delivery_orders',
  EDIT_DELIVERY_STATUS = 'edit_delivery_status',
}

export enum RestaurantMessage {
  CREATE_RESTAURANT = 'create_restaurant',
  GET_RESTAURANTS = 'get_restaurants',
  GET_RESTAURANT = 'get_restaurant',
  GET_RESTAURANT_INFOS = 'get_restaurant_infos',
  EDIT_RESTAURANT = 'edit_restaurant',
  DELETE_RESTAURANT = 'delete_restaurant',
}

export enum ItemMessage {
  CREATE_ITEM = 'create_item',
  GET_ITEMS = 'get_items',
  GET_ITEM = 'get_item',
  EDIT_ITEM = 'edit_item',
  DELETE_ITEM = 'delete_item',
}

export enum MenuMessage {
  CREATE_MENU = 'create_menu',
  GET_MENUS = 'get_menus',
  GET_MENU = 'get_menu',
  EDIT_MENU = 'edit_menu',
  DELETE_MENU = 'delete_menu',
}
