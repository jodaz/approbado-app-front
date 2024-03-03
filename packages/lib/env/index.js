import { NATIVE_ENV } from './native-env'
import { WEB_ENV } from './web-env'

let ENV;
console.log(process.env)
if (process.env.WEB) {
    ENV = WEB_ENV;
} else {
    ENV = NATIVE_ENV;
}

export default ENV;
