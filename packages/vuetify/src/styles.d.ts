// Side-effect 樣式匯入的型別宣告
// 當消費者執行 `import "@confucian-ui/vuetify/styles";` 或
// `import "@confucian-ui/vuetify/styles/variables";` 時，TS 透過這份宣告知道模組存在
declare module "@confucian-ui/vuetify/styles";
declare module "@confucian-ui/vuetify/styles/*";
