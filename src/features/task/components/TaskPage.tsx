import { useEffect, useState } from 'react';

import ResponsiveAppBar from '../../../components/ResponsiveAppBar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getTasks, Task } from '../taskSlice';
import { Container, List, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import AddTask from './AddTask';
import TaskItem from './TaskItem';
import ModalEditTask from './ModalEditTask';
import TasksNull from './TasksNull';

import '../../../styles/taskPage.css';


const TaskPage = () => {

   const dispatch = useAppDispatch();
   const tasks = useAppSelector( state => state.task.tasks );
   const taskEdit = useAppSelector( state => state.task.taskEdit );

   const [tasksDone, setTasksDone] = useState<Task[]>([]);
   const [tasksUnDone, setTasksUnDone] = useState<Task[]>([]);

   useEffect(() => {
      setTasksDone(tasks.filter( task => task.completed === true ));
      setTasksUnDone(tasks.filter( task => task.completed !== true ));
  }, [tasks]);

   useEffect(() => {
      dispatch( getTasks() );
  }, [dispatch])

  return (
    <>
      <ResponsiveAppBar />

      <Container fixed className='task-container'>
      
         <AddTask/>
         <div className='task-box'>
            { tasks.length === 0 ? 
               <TasksNull /> 
               :
               <Grid container spacing={2}>
                  <Grid xs={6}>
                     <Paper sx={{paddingY: '20px', borderRadius:'20px', background:'#ede9f2EE'}} >
                        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
                           Tareas por realizar
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 500, color: 'black' }}>
                           {tasksUnDone.map( (task, index:number) => <TaskItem key={task._id} task={task} />)}
                        </List>
                     </Paper>
                  </Grid>
                  <Grid xs={6}>  
                      <Paper sx={{paddingY: '20px', borderRadius:'20px', background:'#ede9f2EE'}} >
                        <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
                           Tareas realizadas
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 500, color: 'black' }}>
                           {tasksDone.map( (task, index:number) => <TaskItem key={task._id} task={task} />)}
                        </List>
                     </Paper>
                  </Grid>
               </Grid>
            }
         </div>

         {taskEdit ? <ModalEditTask taskEdit={taskEdit}/> : <></>}
      </Container>
    </>
  )
}

export default TaskPage