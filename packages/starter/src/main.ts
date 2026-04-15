import { createApp } from "vue";
import { createConfucian } from "@confucian-ui/vuetify";

// 載入順序重要：Vuetify 基底樣式必須最早插入 bundle
import "vuetify/styles";
import "@confucian-ui/vuetify/styles";
import "./styles/app.scss";

import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);
const confucian = createConfucian();

app.use(confucian);
app.use(router);
app.mount("#app");
