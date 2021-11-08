// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import axios from "axios";
import '@/common/global';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locales from "@/locales";
import router from "./router";

Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n: locales,
  components: { App },
  template: "<App/>"
});
