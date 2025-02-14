import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import { verifyUser } from './schemas/schema.mjs';

// Obtener la URL del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo
const __dirname = path.dirname(__filename);
const PORT = 1234

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req,res)=>{
  // res.send(__dirname+'\\pdf\\factura.pdf' )
  res.sendFile(path.join(__dirname,'pdf','factura.pdf'))
  console.log(path.join(__dirname,'pdf','factura.pdf'));
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

  res.send("Usuario verificado")
})


app.listen(PORT, () =>{
  console.log(` escuchando desde http://localhost:${PORT}`);
})

