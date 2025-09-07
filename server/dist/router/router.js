"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_js_1 = require("../controllers/todo.controller.js");
const router = (0, express_1.Router)();
router.get("/todos", todo_controller_js_1.getTodos);
router.post("/todos", todo_controller_js_1.createTodo);
router.put("/todos/:id", todo_controller_js_1.updateTodo);
router.delete("/todos/:id", todo_controller_js_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=router.js.map