import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Chip} from '@mui/material';
import { TasksCollection } from '../api/TasksCollection';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { Meteor} from "meteor/meteor";

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
        <ListItem>
            <ListItemAvatar>
                <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText primary={task.nome} secondary={task.usuarioCriador}></ListItemText>
        </ListItem>
      ))}
    </List>
    );

};