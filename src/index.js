import app from './app.js'
import {PORT} from './config.js'
import "./database/connDbMongo.js";

app.listen(PORT, ()=> console.log(`listening on ${PORT}`))