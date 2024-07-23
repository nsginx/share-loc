import express from "express";
import {Server} from "socket.io"
import { createServer } from 'http'
import cors from 'cors'

import { URL } from "./constants.js";
// import { v4 as uuidv4 } from 'uuid';

const dataArray = new Map();

const app = express();

app.use(cors([URL]))

const server = createServer(app);

const io = new Server(server, {
    cors : {
        origin : URL
    }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("hello");
})

io.on('connection', (socket)=>{
    console.log(`new user joined : ${socket.id} `);
    
    socket.on('req-location', async ({id})=>{
        let tempArray=[];
        if(dataArray.has(id)){
            tempArray = await dataArray.get(id);
        }
        if(!tempArray.includes(socket.id)){
            tempArray= await tempArray.concat(socket.id);
        }
        await dataArray.set(id, tempArray);
        
        console.log(dataArray);
    })
    
    socket.on('update-location', async (data)=>{
        console.log(socket.id);
        const roomOrClient = await dataArray.get(socket.id);
        console.log('Emitting to:', roomOrClient, 'with data:', data);

        if (roomOrClient) {
            io.to(roomOrClient).emit('get-location', data);
        } else {
            console.log('No room or client found for socket id:', socket.id);
        }

        console.log(dataArray);
    })


    socket.on('disconnect', ()=>{
        dataArray.delete(socket.id);
        console.log(` ${socket.id} disconnected`);
    })
})





server.listen(PORT, ()=>{
    console.log(`server listening at port ${PORT}`);
})