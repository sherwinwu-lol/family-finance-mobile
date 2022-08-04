import axios from 'axios';
import qs from 'qs';
import {currUserInfo} from "../utils/auth";

export const doExec = (url, params, contentType, methods) => {
    let pstr = qs.stringify(params, {
        arrayFormat: 'brackets'
    })
    methods = (methods || 'POST').toUpperCase()

    const pstrMethods = ['DELETE']
    url = pstrMethods.indexOf(methods) === -1 ? url : `${url}?${pstr}`

    return new Promise((resolve, reject) => {
        axios({
                url: (methods && methods.toUpperCase()) !== 'GET' ? url : `${url}?${pstr}`,
                params: null,
                data: (contentType && contentType.toUpperCase()) === 'JSON' ? params : qs.stringify(params),
                method: methods || 'POST',
            })
            .then(res => {

                if (res.code == 4040) {
                    // ServerMixin.Event.$emit('login', res.data.data)
                    reject({})
                } else {
                    resolve(res.data)
                }

            })
    })

};
import auth from '../utils/auth'
// http request 拦截器
axios.interceptors.request.use(
    config => {
        // if (getUserInfo()) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        //     config.headers.Authorization = getUserInfo() ? getUserInfo().Authorization : null;
        // }
        if (!store.state.user) {
          store.state.user = auth.getCurrUserInfo();
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
import store from "@/store/index.js";
import {currUserInfo} from "./basic";


//http response 拦截器

axios.interceptors.response.use(
    response => {
        //身份信息过期
        if (response.data.code == 403) {
          console.log("身份已过期,请重新登录");
        }
        if (response.data.code == 401) {
        }

        if (response.data.code == 500) {
        }

        return response;
    },
    error => {
        console.log('error: ', error);


        // if (error.response.status == 500) {
        //     ServerMixin.Event.$notify.error({
        //         title: '网络异常-500',
        //         message: '网络异常，请刷新或重新打开！'
        //     });
        // } else {

        // }
        console.log('err' + error)
        let {
            message
        } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }

        return Promise.reject(error)
    }
)