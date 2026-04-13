import {Avatar, Box, Button, CssBaseline, Drawer, List, ThemeProvider, Typography} from "@mui/material";
import {React, useState} from "react";
import {theme} from "./theme";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import { Navigate, Outlet, useNavigate } from "react-router";
import {Dehaze, Close} from '@mui/icons-material';
import { alpha } from "@mui/material/styles";

export const DrawerLayout = () => {
    const [open, setOpen] = useState(false);
    const user = useTracker(()=>Meteor.user());
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };
    const handleLogout = () => {
        navigate("/");
        Meteor.logout();
    }
   

    const list = (
        <>
        <Close sx={{cursor: "pointer", 
            width: 40, height: 40, p: 1, 
            borderRadius: "50%", 
            "&:hover": {
                backgroundColor: alpha(theme.palette.background.default, 0.45)
            }}} 
        onClick={()=>toggleDrawer(false)} />
        <Box sx={{p: 4, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Avatar sx={{cursor: "pointer"}} onClick={()=>navigate("/profile")}/>
            <Typography>{user.username}</Typography>
            <Button onClick={()=>navigate("/home")}>HOME</Button>
            <Button onClick={()=>navigate("/home/view")}>Lista de Tarefas</Button>
            <Button variant="outlined" onClick={()=>handleLogout()}>Logout</Button>
        </Box>
        </>
    );

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Dehaze sx={{cursor: "pointer", 
                width: 40, height: 40, p: 1,  
                borderRadius: "50%", 
                "&:hover": {
                    backgroundColor: alpha(theme.palette.info.main, 0.15)
                }
            }} onClick={()=>toggleDrawer(true)}/>
            <Drawer variant="persistent" open={open} >{list}</Drawer>
            <Outlet/>
        </ThemeProvider>
    );
} 