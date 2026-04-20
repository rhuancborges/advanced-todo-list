import {Avatar, Box, Button, CssBaseline, Dialog, Drawer, List, ThemeProvider, Typography} from "@mui/material";
import {React, useState} from "react";
import {theme} from "./theme";
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import { Navigate, Outlet, useNavigate } from "react-router";
import {Dehaze, Close} from '@mui/icons-material';
import { alpha } from "@mui/material/styles";

export const DrawerLayout = () => {
    const [open, setOpen] = useState(false);
    const isLoading = useSubscribe("currentUser");
    const user = useTracker(()=>Meteor.user());
    const navigate = useNavigate();
    
    if (isLoading()){
        return <Dialog open>Carregando...</Dialog>
    }

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
            <Avatar src={user.foto} sx={{width: 50, height: 50, cursor: "pointer"}} onClick={()=>navigate("profile")}/>
            <Typography>{`Username: ${user.username}`}</Typography>
            <Typography>{`Email: ${user.emails[0].address}`}</Typography>
            <Button onClick={()=>navigate("/home")}>HOME</Button>
            <Button onClick={()=>navigate("view")}>Lista de Tarefas</Button>
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
            <Drawer variant="persistent" open={open}>{list}</Drawer>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Outlet/>
            </Box>
        </ThemeProvider>
    );
} 