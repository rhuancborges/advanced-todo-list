import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Alert, Typography,
     Chip, Alert, Fab, Box,
     Stack} from '@mui/material';
import { TasksCollection } from '../api/TasksCollection';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { Meteor} from "meteor/meteor";
import {MoreVert, Add} from '@mui/icons-material';
import {Outlet, useNavigate } from "react-router";

export const View = () => {
    const isLoading = useSubscribe('tasks');
    const user = useTracker(()=>Meteor.user());
    const tasks = useTracker(() => {
        if(!user){
            return [];
        }
        return TasksCollection.find().fetch();
    });
    const navigate = useNavigate();
    return (
    <>
        <List sx={{ width: '100%', maxWidth:600, bgcolor: 'background.paper' }}>
        {tasks.map((task) => (
            <ListItem key={task._id} secondaryAction={
                <MoreVert sx={{"&:hover": {cursor: "pointer"}}} ></MoreVert>
            }>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary={task.nome} secondary={task.usuarioCriador}></ListItemText>
            </ListItem>
        ))}
        
        </List>
        <Stack sx={{width: "60%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
            <Fab sx={{"&:hover":{cursor: "pointer"}}} onClick={()=>navigate("add")}>
                <Add></Add>
            </Fab>
        </Stack>
        <Outlet/>
    </>
    );

};