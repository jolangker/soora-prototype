import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./route";
import "element-plus/dist/index.css";

createApp(App).use(router).mount("#app");
