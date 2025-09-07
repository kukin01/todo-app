import { Prisma } from "@prisma/client";
import express from "express";
import cors from "cors";
import router from "./router/router.js";
import { Logger } from "borgen";
// import { Config } from "./config/index.js";
import { prisma } from "./database/prisma.js";
import bodyParser from "body-parser";
import { Router } from "express";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);
app.get("/", (req, res) => {
    res.send("API is running...");
});
const server = app.listen(PORT, () => {
    Logger.info({
        message: `Server is running on port ${PORT}`,
        messageColor: "greenBright",
        infoColor: "whiteBright",
    });
});
//# sourceMappingURL=app.js.map