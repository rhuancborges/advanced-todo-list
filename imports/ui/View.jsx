import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Alert, Typography,
     Chip, Alert, Fab, Box,
     Stack, Menu, MenuItem,
     Dialog,
     FormControlLabel,
     FormGroup,
     Switch} from '@mui/material';
import { TasksCollection } from '../api/TasksCollection';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { Meteor} from "meteor/meteor";
import {MoreVert, Add, ContentPaste, CheckBox} from '@mui/icons-material';
import {Outlet, useNavigate } from "react-router";
import { useState } from 'react';
import { colorChip } from '../api/taskStatus';
import { theme } from './theme';

export const View = () => {
    const user = useTracker(()=>Meteor.user());
    const [mostraConcluidas, setMostraConcluidas] = useState(false);
    const {tasks, isLoading} = useTracker(() => {
        const handle = useSubscribe('tasks', mostraConcluidas);
        return {isLoading: handle, tasks: TasksCollection.find().fetch()};
    });

    const navigate = useNavigate();

    const [ancora, setAncora] = useState(null);
    const [taskSelecionada, setTaskSelecionada] = useState(null);
    const open = Boolean(ancora);

    if (isLoading()){
        return <Dialog open>Carregando</Dialog>
    }

    const handleClick = (e, task) => {
        setAncora(e.currentTarget);
        setTaskSelecionada(task);
    }

    const handleClose = () => {
        setAncora(null);
    }

    return (
    <>  
        <FormGroup>
            <FormControlLabel control={<Switch checked={mostraConcluidas} 
            onChange={(e)=>setMostraConcluidas(e.target.checked)}/>}label="Mostrar tarefas concluídas"/>
        </FormGroup>
        <List sx={{ width: '100%', maxWidth:600, bgcolor: 'background.paper' }}>
        {tasks.map((task) => (
            <ListItem key={task._id} secondaryAction={
                <MoreVert sx={{"&:hover": {cursor: "pointer"}}} onClick={(e) => handleClick(e,task)} /> 
            }>
                <Stack sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", 
                "&:hover": {cursor: "pointer"}}} 
                onClick={()=>navigate(`task-detail/${task._id}`)}>
                    <ListItemAvatar sx={{display: "flex", alignSelf: "center"}}>
                        <Avatar><ContentPaste/></Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{display: "flex", justifySelf: "space-around", flexDirection: "column"}}
                    primary={task.nome} secondary={task.usuarioCriador}></ListItemText>
                    <Chip sx={{backgroundColor: theme.palette[colorChip[task.situacao]].main, color: "black"}} label={task.situacao}/>
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