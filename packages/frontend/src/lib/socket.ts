import { PUBLIC_WEBSOCKET_URL } from "$env/static/public";
import { Socket, io } from "socket.io-client";

/** The socket client. */
export let socket: Socket | null = null;

/** Initializes the socket connection if it isn't already set. */
export async function initSocket(userId: number) {
    if (socket !== null) return;

    const _socket = io(PUBLIC_WEBSOCKET_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: { userId }
    });

    _socket.on('connection', () => {
        console.log('Connected');
    });

    socket = _socket;
}
