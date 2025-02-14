
import {gender,arrayTypeSpanish} from '../utils/util.mjs'

export const spanishErrorMap = (error,ctx)=>{
  const expected = arrayTypeSpanish[error.expected] || "";
  const received = arrayTypeSpanish[error.received] || "";
  const content = arrayTypeSpanish[error.type] || "";

  // Personalización para error "invalid_date"
  if (error.code === "invalid_date") {
    return { message: `Fecha inválida en ${ctx.path.join('.')}` }; // Contexto mejorado con el path
  }

  // Personalización para error "invalid_string"
  if (error.code === "invalid_string") {
    return {message: ` ${gender(content.gender,1)}  ${content.type} debe ser de tipo string` };
  }

  // Personalización para error "too_small"
  if (error.code === "too_small") {
    return { message: `${gender(content.gender,1)} ${content.type} debe contener como mínimo ${error.minimum} caracter(es)` };
  }

  // Personalización para error "too_big"
  if (error.code === "too_big") {
    return { message: `${gender(content.gender,1)} ${content.type} debe contener como máximo ${error.maximum} caracter(es)` };
  }

  // Personalización para error "invalid_intersection_types"
  if (error.code === "invalid_intersection_types") {
    return { message: `Tipo de intersección inválido en ${ctx.path.join('.')}` }; // Contexto mejorado con el path
  }

  // Personalización para error "not_multiple_of"
  if (error.code === "not_multiple_of") {
    return { message: `El valor debe ser múltiplo de ${error.multipleOf}` }; // Contexto mejorado con el múltiplo
  }

  // Personalización para error "not_finite"
  if (error.code === "not_finite") {
    return { message: `El valor debe ser un número finito` };
  }
  if(error.code === "invalid_type"){
    return {message: `se esperaba ${gender(expected.gender,2)} ${expected.type} y se recibio ${gender(received.gender,2)} ${received.type}`}
  }
  
  return { message: ctx.defaultError };
}



export const spanishErrorMap2 = (issue,ctx)=>{
  const expected = arrayTypeSpanish[issue.expected] || "";
  const received = arrayTypeSpanish[issue.received] || "";
  const content = arrayTypeSpanish[issue.type] || "";

  switch (issue.code) {
    case 'too_small':
        if (issue.type === 'string')
            return { message: `Debe tener al menos ${issue.minimum} caracteres` }
        else if (issue.type === 'number')
            return { message: `Debe ser mayor o igual que ${issue.minimum}` }
        return { message: 'Demasiado corto' }
    case 'too_big':
        if (issue.type === 'string')
            return { message: `No debe tener más de ${issue.maximum} caracteres` }
        else if (issue.type === 'number')
            return { message: `Debe ser menor o igual que ${issue.maximum}` }
        return { message: 'Demasiado largo' };
    case 'invalid_type':
        if (issue.received === 'undefined')
            return { message: 'Requerido' };
        return { message: `se esperaba ${gender(expected.gender,2)} ${expected.type} y se recibio ${gender(received.gender,2)} ${received.type}`}
    case 'invalid_email':
        return { message: 'Formato de correo electrónico inválido' }
    // ... añade más casos para otros códigos de error que quieras en español
    default:
      return { message: ctx.defaultError };
  }
  
}
