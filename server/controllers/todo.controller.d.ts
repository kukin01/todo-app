import { Request, Response } from 'express';
declare const getTodos: (req: Request, res: Response) => Promise<void>;
declare const createTodo: (req: Request, res: Response) => Promise<void>;
declare const updateTodo: (req: Request, res: Response) => Promise<void>;
declare const deleteTodo: (req: Request, res: Response) => Promise<void>;
export { getTodos, createTodo, updateTodo, deleteTodo };
//# sourceMappingURL=todo.controller.d.ts.map