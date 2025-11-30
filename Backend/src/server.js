import express from 'express';
import cors from 'cors';

const app = express();
const port = 2025;

app.use(cors());
app.use(express.json());
app.get('/', (req, res)=>{
    res.send('Server running.')
})

app.listen(port, ()=>{
    console.log("Listening on Port: ", port)
})
