import { Save } from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, Modal, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { Task, removeEditTask, updateTask } from "../taskSlice";
import useForm from "../../../hooks/useForm";


const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 600,
   bgcolor: '#e8ecff',
   boxShadow: 24,
   p: 4,
   color: '#333'
 };

 interface FormValues {
   title: string,
}

interface props {
   taskEdit: Task
}

const ModalEditTask = ( { taskEdit }: props ) => {

   const dispatch = useAppDispatch();

   const { formValues, handleInputChange } = useForm<FormValues>({
      title: taskEdit ? taskEdit.title+'' : ''
   });
   const { title } = formValues;

   const handleClose = () => dispatch( removeEditTask() );
   
   const handleAddTaskBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const task:Task = {
         _id: taskEdit._id,
         title: title,
         completed: taskEdit.completed,
         created: taskEdit.created
      }

      dispatch( updateTask(task) );
   }

   


   return (
      <Modal
         open={taskEdit ? true : false}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style} className='modal-task' >
            <Typography id="modal-modal-title" align='center' variant="h5" component="h1">
               Editar tarea
            </Typography>
            <Paper
               component="form"
               sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
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
                  <Save />
                  {/* <SearchIcon /> */}
               </IconButton>
            </Paper>

         </Box>
      </Modal>
   )
}

export default ModalEditTask