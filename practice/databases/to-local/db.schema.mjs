import dbLocal from 'db-local'
import { createDirname } from '../../utils/path.mjs';

const {__dirname} = createDirname(import.meta.url);
const {Schema} = new dbLocal({path: "./data"});

const ModelPrueba = "Pruebas"
const baseModel = {
  _id: { 
    type: Number
  },
  name: String,
  bag: {
    items: Array,
    id: String,
    required: true
  }
}

const Prueba = Schema(ModelPrueba,baseModel)

Prueba.create({
  _id: 1,
  name : "lennart",
  bag : [{ space1: "arroz" },{ space1: "arroz" }]
}).save()