import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Alert, Typography,
     Chip, Alert, Fab, Box,
     Stack, Menu, MenuItem} from '@mui/material';
import { TasksCollection } from '../api/TasksCollection';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { Meteor} from "meteor/meteor";
import {MoreVert, Add} from '@mui/icons-material';
import {Outlet, useNavigate } from "react-router";
import { useState } from 'react';

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

    const [ancora, setAncora] = useState(null);
    const [taskSelecionada, setTaskSelecionada] = useState(null);
    const open = Boolean(ancora);

    const handleClick = (e, task) => {
        setAncora(e.currentTarget);
        setTaskSelecionada(task);
    }

    const handleClose = () => {
        setAncora(null);
    }

    return (
    <>
        <List sx={{ width: '100%', maxWidth:600, bgcolor: 'background.paper' }}>
        {tasks.map((task) => (
            <ListItem key={task._id} secondaryAction={
                <MoreVert sx={{"&:hover": {cursor: "pointer"}}} onClick={(e) => handleClick(e,task)} /> 
            }>
                <Stack sx={{display: "flex", flexDirection: "row", "&:hover": {cursor: "pointer"}}} 
                onClick={()=>navigate(`task-detail/${task._id}`)}>
                    <ListItemAvatar sx={{display: "flex", alignSelf: "center"}}>
                        <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{display: "flex", justifySelf: "space-around", flexDirection: "column"}}primary={task.nome} secondary={task.usuarioCriador}></ListItemText>
                </Stack>
            </ListItem>
        ))}
            <Menu
                    anchorEl={ancora}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => navigate(`edit/${taskSelecionada._id}`)}>Editar tarefa</MenuItem>
                    <MenuItem onClick={() => navigate(`remove/${taskSelecionada._id}`)}>Remover tarefa</MenuItem>
                </Menu>
        
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