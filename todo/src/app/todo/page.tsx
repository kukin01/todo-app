'use client'
import React, { useState, useEffect } from 'react';
import { useTodos } from '@/hooks/useTodo';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react'
import { Trash, Check } from 'lucide-react';

const AddTodo: React.FC = () => {
    const { addMutation,
        deleteMutation, 
        updateMutation, 
        items: fetchedItems, 
        isLoading, 
        isError, 
        queryError, 
        refetch } = useTodos();
    const [inputValues, setInputValues] = useState('')

    interface TodoItem {
        id: number;
        text: string;
        completed: boolean;
    }

    const handleAddItem = (): void => {
        if (inputValues.trim() !== '') {
            addMutation.mutate(inputValues);
            setInputValues('');
        }
    }
    const handleRemoveItem = (id: number): void => {
        deleteMutation.mutate(id);
    }

    const handleToggleComplete = (id: number): void => {
       const todo = fetchedItems.find(item => item.id === id);
       if (todo) {
           updateMutation.mutate({ ...todo, completed: !todo.completed });
       }
    }
    const items = fetchedItems.length;
    const doneItems = fetchedItems.filter(item => item.completed).length;
    return (
      <div className='h-screen w-full bg-[#0D0714] flex justify-center items-center'>
        <div className='bg-[#1D1825] h-189.5 w-145.5 flex flex-col  justify-center gap-6 items-center border-none rounded-2xl px-2 py-4'>
                        <div className='flex gap-4'>
                                <Input
                                    placeholder='Add a new task'
                                    value={inputValues}
                                    onChange={e => setInputValues(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddItem();
                                        }
                                    }}
                                />
                                <Plus
                                    className='w-10 h-10 rounded-2xl bg-[#9E78CF] text-white font-normal cursor-pointer flex-shrink-0'
                                    onClick={handleAddItem}
                                />
            </div>
            <div className='flex flex-col w-full h-auto px-16'>
                <div className='flex items-center text-white text-[16px]'>
                <p>Tasks to do - </p> <span>{items}</span>
                </div>
                {isLoading && <p className='text-white'>Loading...</p>}
                {isError && <p className='text-red-500'>Error: {queryError?.message}</p>}
                    <ul className='w-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#9E78CF] scrollbar-track-transparent scrollbar-thumb-rounded-full mt-4 px-1 justify-center items-center'>
                        {fetchedItems.map((item, index) => (
                            <li key={index} className='flex justify-between list-none w-full h-19 bg-[#15101C]  items-center px-4 rounded-xl mb-2'>
                                <span className='text-[#9E78CF] text-[16px]'>{item.text}</span>
                                <span className='flex gap-2'>
                                    <Check className='w-5 h-5 text-[#9E78CF]' onClick={() => handleToggleComplete(item.id)} />
                                    <Trash className='w-5 h-5 text-[#9E78CF]' onClick={() => handleRemoveItem(item.id)} />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col w-full h-auto px-16'>
                <div className='flex items-center text-white text-[16px]'>
                <p>Done - </p> <span>{doneItems}</span>
                </div>
                    <ul className='w-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#9E78CF] scrollbar-track-transparent scrollbar-thumb-rounded-full mt-4 px-1 justify-center items-center'>
                        {fetchedItems.filter(item => item.completed).map((item, index) => (
                            <li key={index} className='flex justify-between list-none w-full h-19 bg-[#15101C]  items-center px-4 rounded-xl mb-2'>
                                <span className='text-[#78CFB0] text-[16px] line-through'>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AddTodo;