import { createApp } from 'vue'
//**** 全局引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
import router from "./router";
import store from "./store";
import App from './App.vue'

let app = createApp(App);
//**** 全局引入vant
app.use(Vant);
app.use(router)
app.use(store)
app.mount('#app')
