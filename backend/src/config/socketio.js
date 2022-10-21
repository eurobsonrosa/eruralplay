import { Server } from 'socket.io'
import moment from 'moment'

const room = {}

/**
 * room : {
 *  "8181803237801031" : {
 *      last_messages: [],
 *      controls: {},
 *      countUsers: 0
 *      }
 * }
 */


function saveMenssage(id, message) {

        if(message.bgColor) return

    if (!room[id].last_messages) {
        room[id].last_messages = []
    }

    if (room[id].last_messages.length > 20) {
        room[id].last_messages.shift()
    }
    room[id].last_messages.push(message)
}

function saveControls(id, controls){
    if(!room[id].controls){
        room[id].controls = {}
    }    
    room[id].controls = controls
}

export default (server) => {
    const io = new Server(server, {
        cors: {
            origins: ['http://localhost:8080']
        }
    })

    io.on('connection', (socket) => {
        const username = socket.handshake.query.username
        const id = socket.handshake.query.roomId
        
        socket.join(id)
        socket.join(`controls ${id}`)        

        console.log(`${username} entrou da sala ${id}.`)

        if(!room[id]){
            room[id] = {
                last_messages: [],
                controls: {},
                userCount: 0
            }
        }

        room[id].userCount = ++room[id].userCount

        if (room[id].last_messages) {
            room[id].last_messages.map(msg => {
                socket.emit(id, msg)
            })
        }

        io.emit(id, {date: `${moment().format('DD/MM/YYYY HH:mm:ss')}`, 
            text: `${username} entrou na sala`, bgColor: '#70e98d'})              
        
        if(room[id].userCount == 1){
            room[id].controls = {controller: username, currentTime: 0, paused: true}          
            socket.emit(`controls ${id}`, room[id].controls, room[id].userCount)
        }

        if(room[id].controls){
            socket.emit(`controls ${id}`, room[id].controls, room[id].userCount)
        }        

        socket.on(id, (msg) => {
            io.emit(id, msg)
            saveMenssage(id, msg)
        })

        socket.on(`controls ${id}`, (controls) => {
            io.emit(`controls ${id}`, controls, room[id].userCount)
            saveControls(id, controls)
        })

        socket.on('disconnect', () => {
            io.emit(id, { date: `${moment().format('DD/MM/YYYY HH:mm:ss')}`, 
            text: `${username} saiu da sala`, bgColor: '#e40c49' })
            room[id].userCount = --room[id].userCount
        });
    });
}
