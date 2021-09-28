import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import "element-plus/dist/index.css";
import "./index.css";

createApp(App).use(router).mount("#app");
