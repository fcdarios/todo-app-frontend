
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Task, deleteTask, setEditTask, updateTask } from '../taskSlice'
import { Delete, Edit } from '@mui/icons-material';
import { useAppDispatch } from '../../../app/hooks';


interface props {
   task: Task
}

const TaskItem = ({ task }: props) => {

   const dispatch = useAppDispatch();
   const { _id, title, completed, created } = task;


   const handleCompleted = () => {
      const updTask = {
         _id,
         title, 
         completed: !completed,
         created
      }
      dispatch( updateTask( updTask ));
   };

   const handleEdit = () => {
      dispatch( setEditTask(task) );
   }
   const handleDelete = () => {
      dispatch( deleteTask( _id+'' ));
   }


   return (
      <ListItem
         key={_id}
         secondaryAction={
            <IconButton edge="end" aria-label="edit" onClick={handleDelete}>
               <Delete />
            </IconButton>
         }
         disablePadding
         sx={{borderBottom:'1px solid #34375a33'}}
      >
         <ListItemButton disableRipple>
            <ListItemIcon>
               <Checkbox
                  edge="start"
                  checked={completed} 
                  onClick={handleCompleted}
               />
            </ListItemIcon>
            <ListItemText id={_id+''} primary={title} />
            <IconButton edge="end" aria-label="edit" sx={{margin: "0px 10px"}} onClick={handleEdit}>
               <Edit />
            </IconButton>
         </ListItemButton>
      </ListItem>
  )
}

export default TaskItem