import express from "express";
import dotenv from 'dotenv';
import http from 'http';
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
    origin: "http://localhost:5173"
}))

interface SimplifiedUser {
	id: number;
	nickname: string;
	firstName: string;
	lastName: string;
}

interface PrivateMessage {
    id: number,
    sender: SimplifiedUser,
    receiver: SimplifiedUser,
    content: string,
    /** A parsable date. */
    sentAt: string
}

const sessions: Record<number, string> = {};
io.on('connection', (socket) => {
    const userId = Number(socket.handshake.query.userId as string);
    if (isNaN(userId)) return;

    sessions[userId] = socket.id;

    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });

    socket.on('send_private_message', (message: PrivateMessage) => {
        console.log("Received private message")
        socket.broadcast.to(sessions[message.receiver.id]).emit("receive_private_message", message);
    })
});

server.listen(process.env.APP_PORT || 4000, () => {
    console.log(`[Server] Running on port ${process.env.APP_PORT || 4000}`);
});
