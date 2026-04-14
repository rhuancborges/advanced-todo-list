import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Alert, Typography, Chip, Alert} from '@mui/material';
import { TasksCollection } from '../api/TasksCollection';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { Meteor} from "meteor/meteor";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const View = () => {
    const isLoading = useSubscribe('tasks');
    const user = useTracker(()=>Meteor.user());
    const tasks = useTracker(() => {
        if(!user){
            return [];
        }
        return TasksCollection.find().fetch();
    });
    
    return (
    <List sx={{ width: '100%', maxWidth:600, bgcolor: 'background.paper' }}>
      {tasks.map((task) => (
        <ListItem secondaryAction={
            <MoreVertIcon sx={{"&:hover": {cursor: "pointer"}}} ></MoreVertIcon>
        }>
            <ListItemAvatar>
                <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={task.nome} secondary={task.usuarioCriador}></ListItemText>
        </ListItem>
      ))}
    </List>
    );

};