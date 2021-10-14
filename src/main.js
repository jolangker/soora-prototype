import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
// import "./styles/element/index.scss";
import "./styles/main.scss";
import ElementPlus from "element-plus";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
