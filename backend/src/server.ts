import { connectDB } from './config/db';
import app from "./app"
import {ENV} from './config/env.config';

connectDB();
app.get('/', (req, res) => {res. send ('servidor encendido')});
app.listen(ENV.PORT, () => {console.log(`Servidor escuchando en http://localhost:PORT`); });
