// import io from "socket.io-client"
// import config from "@config/index"
// import { SocketEvent } from "@interfaces/socket"
//
// const socket = io(config.socketServer, {
//   reconnectionDelayMax: 5000,
//   transports: ["websocket"]
// })
//
// socket.on("connect", () => {
//   if (config.env !== "test") {
//     console.log("Successful connection to websocket server:", socket.id)
//   }
//
//   socket.on('broadcast new signup', (data: any) => {
//     socket.broadcast.emit('receive new signup', data);
//   })
//
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   socket.on('disconnect', () => {})
//
//   socket.on('join channel', function(data){
//     socket.join(data.channel);
//   })
//
//   socket.on('leave channel', function(data){
//     socket.leave(data.channel);
//   })
//
//   socket.on('broadcast message', function(data){
//     socket.broadcast.to(data.channel).emit('receive message', data);
//     socket.broadcast.emit('receive notification', data.channel);
//   })
//
//   socket.on('broadcast created channel', function(data){
//     socket.broadcast.emit('receive channel', data);
//   })
//
//   socket.on('broadcast emoticon', function(data){
//     socket.broadcast.to(data.channel).emit('receive emoticon', data);
//   })
//
//   socket.on('broadcast updated message', function(data){
//     socket.broadcast.to(data.channel).emit('receive updated message', data);
//   })
//
//   socket.on('broadcast deleted message', function(data){
//     socket.broadcast.to(data.channel).emit('receive deleted message', data);
//   })
// })
//
// export const sendToWS = (toUser: number, event: SocketEvent) => {
//   socket.emit("event", {
//     to: toUser,
//     event
//   })
// }
