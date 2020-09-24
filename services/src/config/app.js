import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import cors from 'cors';
import socket from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
//Dependencies
import Files from '../app/routes/files.route';
import Auth from '../app/routes/auth.route';
import Admin from '../app/routes/admin.route';
import Comercial from '../app/routes/comercial.route';
import Temporal from '../app/routes/temporal.route';
import Administracion from '../app/routes/administracion.route';
import Logistica from '../app/routes/logistica.route';
import comercialSocket from '../app/sockets/comercial.socket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

//Sockets
comercialSocket(io);

//Middlewares
app.use(cors());
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }));
app.use(cookie());
app.use(morgan('dev'));

//Routes
app.use('/public', express.static('public'));
app.use('/download', Files)
app.use('/api/auth', Auth);
app.use('/api/admin', Admin);
app.use('/api/comercial', Comercial);
app.use('/api/externo', Temporal);
app.use('/api/administracion', Administracion);
app.use('/api/logistica', Logistica);

export default server;