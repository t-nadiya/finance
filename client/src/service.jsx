import {io} from "socket.io-client"

export const socket = io.connect("http://localhost:4000");
// export const SocketContext = React.createContext();

export function connect() {
    socket.on("connect", () => {
        socket.emit("start");
      });
}
export function displayTicker(tickerName) {
    socket.emit("display", tickerName);
    console.log('list '+ socket.id);
}
export function removeTicker(tickerName) {
    socket.emit("remove", tickerName);
    console.log('card '+ socket.id);
  }