export function gender(gender,option){
  if(gender === "masculino"){
    if(option === 1) return "el"
    else return "un"
  }else if(gender === "femenino"){
    if(option === 1) return "la"
    else return "una"
  }
  return "desconocido"
}

export const arrayTypeSpanish = {
  array: {
    type: "arreglo",
    gender: "masculino"
  },
  string:{
    type: "cadena",
    gender: "femenino"
  } ,
  number:{
    type: "numero",
    gender: "masculino"
  } ,
  date:  {
    type: "fecha",
    gender: "femenino"
  } ,
  bigint:{
    type: "numero entero grande",
    gender: "masculino"
  } 
}