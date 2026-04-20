import { Card, Typography, Box, Stack, Grid, CardContent } from "@mui/material";
import {theme} from "./theme"
import { useNavigate } from "react-router";
import { alpha } from "@mui/material";
import { TasksCollection } from "../api/TasksCollection";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

export const Dashboard = () => {
    const navigate = useNavigate();
    
    const sxCard = {
        minHeight: 260,
        height: "100%",
        background: alpha(theme.palette.background.paper, 0.8),
        width: 280,
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
        }
    }
   
    const isLoading = useSubscribe('tasks');
    
    const user = Meteor.user();
    const countConcluidas = useTracker(() => {
        if(!user){
            return 0;
        }
        return TasksCollection.find({situacao: "Concluída"}).count()});
    const countTotal = useTracker(() =>{
        if(!user){
            return 0;
        } 
        return TasksCollection.find().count()});

    return (
        <>
        <Typography variant="h5" sx={{marginBottom: 2}}> Olá, seja bem vindo ao To-Do List!</Typography>
        <Grid sx={{display: "flex", justifyContent: "center"}}
        container rowSpacing={4} >
            <Grid item size={6} sx={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
                <Card elevation={4}
                    sx={sxCard}>
                    <CardContent>
                        <Typography variant="h4">Total de tarefas cadastradas</Typography>
                        <Typography variant="h2" sx={{marginTop: 5}}>{countTotal}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item size={4} sx={{display: "flex", flexDirection: "row", justifyContent:"flex-start"}}>
                <Card elevation={4}
                    sx={sxCard}>
                    <CardContent>
                        <Typography variant="h4">Total de tarefas concluídas</Typography>
                        <Typography variant="h2" sx={{marginTop: 5}}>{countConcluidas}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item size={6} sx={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
                <Card elevation={4}
                    sx={sxCard}>
                    <CardContent>
                        <Typography variant="h4">Total de tarefas a serem concluídas</Typography>
                        <Typography variant="h2" sx={{marginTop: 5}}>{countTotal-countConcluidas}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item size={4} sx={{display: "flex", flexDirection: "row", justifyContent:"flex-start"}}>
                <Card elevation={4}
                    sx={{...sxCard, "&:hover":{
                        ...sxCard["&:hover"], cursor:"pointer"}}} onClick={()=>navigate("/home/view")}>
                    <CardContent>
                        <Typography variant="h3" sx={{marginTop: 5}}>Visualizar tarefas</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>);
};