import { io } from 'socket.io-client';
import moment from "moment"

class SocketioService {
  socket;
  messages;
  controls;
  userCount;
  constructor(roomId) {
    this.roomId = roomId
    this.messages = []
    this.controls = {}
    this.userCount = 0;
  }

  setupSocketConnection(username) {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
      query: {
        username,
        roomId: this.roomId
      }
    });

    this.socket.on(`controls ${this.roomId}`, (controls, userCount) => {
      this.controls = controls
      this.userCount = userCount;
    })
    
    this.socket.on(this.roomId, (msg) => {
      this.messages.push(msg)
    })   
  }

  imit(username, msg) {
    this.socket.emit(this.roomId, { date: `${moment().format('DD/MM/YYYY HH:mm:ss')}`, username: `${username}`, text: `${msg}` })
  }

  emitControls(controls) {
    this.socket.emit(`controls ${this.roomId}`, controls) 
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getMessage() {
    return this.messages
  }

  getControls() {
    return this.controls
  }

  getUserCount(){
    return this.userCount;
  }
}

export default SocketioService