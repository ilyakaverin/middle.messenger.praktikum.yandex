export const setupSocket = (userId: number, chatId: number, token: string) =>
  new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
  );
