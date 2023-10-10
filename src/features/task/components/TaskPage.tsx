import React, { useEffect } from 'react'

import '../../../styles/taskPage.css';
import ResponsiveAppBar from '../../../components/ResponsiveAppBar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getTasks } from '../taskSlice';
import { Container, List } from '@mui/material';
import AddTask from './AddTask';
import TaskItem from './TaskItem';
import ModalEditTask from './ModalEditTask';


const TaskPage = () => {

   const dispatch = useAppDispatch();
   const tasks = useAppSelector( state => state.task.tasks );
   const taskEdit = useAppSelector( state => state.task.taskEdit );

   
   useEffect(() => {
      dispatch( getTasks() );
  }, [dispatch])

  return (
    <>
      <ResponsiveAppBar />

      <Container fixed className='task-container'>
      
         <AddTask/>
         <h1>Tareas</h1>
      

         { !tasks 
            ? <h1>No hay tareas</h1>
            : <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', color: 'black' }}>
                 {tasks.map( (task, index:number) => <TaskItem key={task._id} task={task} />)}
              </List>
         }

         {taskEdit ? <ModalEditTask taskEdit={taskEdit}/> : <></>}
         

      </Container>
    </>
  )
}

export default TaskPage