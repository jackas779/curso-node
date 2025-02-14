import path from 'path';
import { fileURLToPath } from 'url';
const dirname = (route) =>{
  return  path.dirname(fileURLToPath(route));
}

export default dirname