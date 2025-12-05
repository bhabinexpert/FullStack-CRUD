import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoute.js';


const app = express();
const port = 2025;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Server running.')
})


app.use('/api', clientRoutes);
app.listen(port, ()=>{
    console.log("Listening on Port: ", port)
})
