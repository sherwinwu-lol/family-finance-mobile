import {currUserInfo} from "../api/basic";

const auth = {
  getCurrUserInfo: function () {
    var key = 'CURR_USER_INFO';
    if (!localStorage.getItem(key)) {
      currUserInfo()
        .then(res => {
          localStorage.setItem(key, res.data);
        })
    }
    return localStorage.getItem(key);
  }
}