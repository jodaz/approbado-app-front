import { NATIVE_ENV } from './native-env'
import { WEB_ENV } from './web-env'

let ENV;

if (process.env.WEB) {
    ENV = WEB_ENV;
} else {
    ENV = NATIVE_ENV;
}
console.log(process.env)
export default ENV;
