import socketIOClient from "socket.io-client";
import CONFIG_NAMES from '../configs'
const socket = socketIOClient(CONFIG_NAMES.SOURCE)

function newMessage(cb) {
    socket.on('new_message', data => console.log(data));
    socket.disconnect();
}

function newNotification(cb) {
    socket.on('new_notification', data => console.log(data));
    socket.disconnect();
}

export { newMessage, newNotification };
