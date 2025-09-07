// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/todo';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(API_URL);
  if (response.status !== 200) {
    throw new Error('Error fetching todos');
  }
  return response.data;
}

export const addTodo = async (text:string): Promise<Todo>=>{
    const response = await axios.post<Todo>(API_URL, { text });
    if (response.status !== 201) {
        throw new Error('Error adding todo');
    }
    return response.data;
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await axios.put<Todo>(`${API_URL}/${todo.id}`, todo);
    if (response.status !== 200) {
        throw new Error('Error updating todo');
    }
    return response.data;
}

export const deleteTodo = async (id: number): Promise<Todo> => {
    const response = await axios.delete<Todo>(`${API_URL}/${id}`);
    if (response.status !== 200) {
        throw new Error('Error deleting todo');
    }
    return response.data;
}   
