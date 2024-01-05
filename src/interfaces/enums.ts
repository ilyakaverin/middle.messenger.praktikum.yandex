export enum routes {
  login = "/",
  register = "/sign-up",
  chat = "/messenger",
  edit = "/settings",
  changePassword = "/change-password",
  newChat = "/new-chat",
  notFound = "/404",
}
export enum StoreEvents {
  Updated = "updated",
}

export enum ConnectStatus {
  CONNECTING = "Connecting",
  CONNECTED = "Disconnect",
  DISCONNECTING = "Disconnecting",
  DISCONNECTED = "Connect",
}
