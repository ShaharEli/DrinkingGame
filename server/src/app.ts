import helmet from 'helmet';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import reqFormatter from 'request-fields-selector';
import routes from './routes';
import connectToDb from './db/connection';
import loggerMiddleWare from './logger/morgan';
import socketHandler from './sockets/socketHandler';
import { notFound } from './middelwares';
// const { admin } = require("./src/utils/firebase.util");

connectToDb();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(helmet());

app.use(loggerMiddleWare);
app.use(reqFormatter);
socketHandler(io);
app.use('/api', routes);
app.set('socketio', io);

app.use(notFound);
export default server;
