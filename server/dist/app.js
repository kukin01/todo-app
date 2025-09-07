"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_js_1 = __importDefault(require("./router/router.js"));
const borgen_1 = require("borgen");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/", router_js_1.default);
app.get("/", (req, res) => {
    res.send("API is running...");
});
const server = app.listen(PORT, () => {
    borgen_1.Logger.info({
        message: `Server is running on port ${PORT}`,
        messageColor: "greenBright",
        infoColor: "whiteBright",
    });
});
//# sourceMappingURL=app.js.map