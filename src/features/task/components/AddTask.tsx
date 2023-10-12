
import { Add } from '@mui/icons-material'
import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import React from 'react'
import useForm from '../../../hooks/useForm';
import { useAppDispatch } from '../../../app/hooks';
import { addTask } from '../taskSlice';



interface FormValues {
   title: string
}

const AddTask = () => {

   const dispatch = useAppDispatch();
   const { formValues, handleInputChange, resetForm } = useForm<FormValues>({
      title: ''
   });
   const { title } = formValues;


   const handleAddTaskBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      dispatch( addTask(title) );
      resetForm({title:''});
   }

   return (
      <div className='add-task-card'>
         <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "60%" }}
            className=''
         >
            <InputBase
               sx={{ ml: 1, flex: 1 }}
               placeholder="Agregar una tarea"
               inputProps={{ 'aria-label': 'Agregar una tarea' }}
               name='title'
               onChange={ handleInputChange }
               value={title}
               onKeyDown={(event => {
                  if (event.key === "Enter") {
                     // Evita que se envíe el evento al navegador
                     event.preventDefault();
                  }
               })}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
               type="button" 
               sx={{ p: '10px' }}  
               aria-label="Agregar"
               onClick={handleAddTaskBtn}
            >
               <Add/>
            {/* <SearchIcon /> */}
            </IconButton>
         </Paper>
      </div>
   )
}

export default AddTask