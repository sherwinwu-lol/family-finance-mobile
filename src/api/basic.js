import {
  doExec
} from './request.js'

export function login(params) {
  return doExec("/ff-api/login", params, null, 'post');
}

export function currUserInfo() {
  return doExec("/ff-api/basic/currUserInfo", null, null, 'get');
}
