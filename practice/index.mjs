import express from 'express'
import { verifyUser } from './schemas/schema.mjs';
import path from 'path';
import dirname from './utils/path.mjs';

const __dirname = dirname(import.meta.url);

const PORT = 1234

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req,res)=>{
  // res.send(__dirname+'\\pdf\\factura.pdf' )
  res.sendFile(path.join(__dirname,'pdf','factura.pdf'))
})


app.get('/users', (req,res) =>{
  const {user} = req.body
  const result = verifyUser({username: user})

  if(!result.success){
    const field = result.error.issues[0].path[0]
    const error = result.error.issues[0].message
    res.send({field: field ,error : error})
    return
  }
  res.json(result.data)
})

app.post('/register/users', (req,res)=>{
  console.log(req.body);
  res.send('hola mundo')
})


app.listen(PORT, () =>{
  console.log(` escuchando desde http://localhost:${PORT}`);
})

