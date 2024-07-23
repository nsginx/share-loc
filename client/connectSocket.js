import { io } from 'socket.io-client';
import {ServerURL} from './constants.js'

export const socket = io(ServerURL, {
    autoConnect: false
});