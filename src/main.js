import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import ElementPlus from "element-plus";
import "./styles/main.scss";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
