import dbLocal from 'db-local'

const {Schema} = new dbLocal({path: "./data"});

const ModelPrueba = "Pruebas"
const baseModel = {
  _id: { 
    type: Number
  },
  name: String,
  bag: {
    type: Array,
    required: true
  }
}

const Prueba = Schema(ModelPrueba,baseModel)

// Prueba.create({
//   _id: 3,
//   name : "kar",
//   bag : ["patilla", "lulo"]
// }).save()

console.log(Prueba.find(user => user.name == "lenny"));