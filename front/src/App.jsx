import React, { useEffect, useState } from 'react';
import './App.css';
import { useQueryTasks } from './hooks/useQueryTasks';
import TodoList from './components/TodoList';
import { useMutationAddTask } from './hooks/useMutationAddTask';
import Title from './components/Title';
import { AppContainer } from './AppStyled';

function App() {

  const [todos, setTodos] = useState();
  const [inpAdd, setInpAdd] = useState('');
 
  const {data, isLoading, refetch} = useQueryTasks();
  const {mutateAsync: addTaskMutateAsync} = useMutationAddTask();
 
 useEffect(() => {
  if (data) {
    setTodos(data);
  }
 }, [data]);
 
 async function addTask () {
  if (inpAdd) {
    try {
      await addTaskMutateAsync({id: new Date().getTime(), task: inpAdd, isdone: false});
    } catch (error) {
      console.log(error);
    }
    refetch();
    setInpAdd('');
  }
 }

 //input for adding a task
 function handleInpAddTaskValue(e) {
  setInpAdd(e.target.value);
 }

 return (
    <div>
      <AppContainer>
        <Title />

        <input type='text'value={inpAdd} autoFocus={true} onChange={handleInpAddTaskValue}/>
        <button onClick={addTask}>Add</button>
        
        {!isLoading ? todos?.map((todo) => (
          <TodoList key={todo.id} id={todo.id} isDone={todo.isdone} task={todo.task} refetch={refetch}/>
        )) : <div>Loading...</div>}
      </AppContainer>
    </div>
 );
}

export default App;
