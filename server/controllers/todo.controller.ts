//@ts-nocheck
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const createTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: { text },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { text, completed },
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.json(deletedTodo);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };