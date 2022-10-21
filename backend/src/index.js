import "dotenv/config"
import "./config/mongo"
import cors from 'cors'
import express from "express"
import userRoutes from "./routes/user.routes"
import roomRoutes from "./routes/room.routes"
import http from 'http'
import socketConfig from './config/socketio'

const app = express()
const server = http.createServer(app);
socketConfig(server)

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(roomRoutes)

app.get('/', (req, res) => {
    res.send('<h1>eRural Play</h1>');
  });

server.listen(process.env.PORT, () => {
    console.log(`Backend executando na porta ${process.env.PORT}`)
})