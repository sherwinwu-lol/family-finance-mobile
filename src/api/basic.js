import {
  doExec
} from './request.js'

const basic = {
  login(params) {
    return doExec("/ff-api/login", params, null, 'post');
  }
}
export default basic;