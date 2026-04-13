import {Avatar, Box, Button, CssBaseline, Drawer, List, ThemeProvider, Typography} from "@mui/material";
import {React, useState} from "react";
import {theme} from "./theme";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import { Navigate, Outlet, useNavigate } from "react-router";
import {Dehaze, Close} from '@mui/icons-material';

export const DrawerLayout = () => {
    const [open, setOpen] = useState(false);
    const user = useTracker(()=>Meteor.user());
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };
   

    const list = (
        <>
        <Close onClick={()=>toggleDrawer(false)} />
        <Box sx={{p: 4, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Avatar/>
            <Typography>{user.username}</Typography>
            <Button onClick={()=>navigate("/home")}>HOME</Button>
            <Button onClick={()=>navigate("/view")}>Lista de Tarefas</Button>
            <Button onClick={()=>navigate("/profile/edit")}>Editar Perfil</Button>
        </Box>
        </>
    );

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Dehaze onClick={()=>toggleDrawer(true)}/>
            <Drawer variant="persistent"open={open} >{list}</Drawer>
            <Outlet/>
        </ThemeProvider>
    );
} 