import { fetchTodos, addTodo,updateTodo, deleteTodo } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Todo } from "@/lib/api";

export const useTodos = () => {
    const queryClient = useQueryClient();
    const { data: items, isLoading, isError,error:queryError } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    });

    const addMutation = useMutation({
        mutationFn: addTodo,
        onMutate: async(newTodoText:string)=>{
            await queryClient.cancelQueries({queryKey:['todos']});
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
            queryClient.setQueryData(['todos'], (old: any) => [...old, { id: Date.now(), text: newTodoText }]);
            return { previousTodos };
        },
        onError: (err, newTodoText, context:any) => {
            queryClient.setQueryData(['todos'], context.previousTodos);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['todos']});
        }
    });
    const updateMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['todos']});
        }
    });
    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onMutate: async(id:number)=>{
            await queryClient.cancelQueries({queryKey:['todos']});
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
            queryClient.setQueryData(['todos'], (old: any) => old.filter((todo:Todo) => todo.id !== id));
            return { previousTodos };
        },
        onError: (err, id, context:any) => {
            queryClient.setQueryData(['todos'], context.previousTodos);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['todos']});
        }
    });
    return {
        items: items || [],
        isLoading,
        isError,
        queryError,
        addMutation,
        updateMutation,
        deleteMutation,
        refetch: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
    };
};