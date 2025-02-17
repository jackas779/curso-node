export class  UserModel {
  static create = ({input}) =>{
    return res.status(201).json({response: "creado"})
  }
}