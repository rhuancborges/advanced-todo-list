import { Card, Typography, Box, Stack, Grid, CardContent } from "@mui/material";
import {theme} from "./theme"
import { useNavigate } from "react-router";
import { alpha } from "@mui/material";
import { TasksCollection } from "../api/TasksCollection";
import {useSubscribe} from "meteor/react-meteor-data";

export const Dashboard = () => {
    const navigate = useNavigate();
    
    const sxCard = {
        minHeight: 260,
        height: "100%",
        background: alpha(theme.palette.background.paper, 0.8),
        width: 280,
        borderRadius: 3,
        display: "flex",
        alignItems: "flex-star",
        justifyContent: "center",
        "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
        }
    }

    const isLoading = useSubscribe('tasks');

    const countConcluidas = TasksCollection.find({situacao: "Concluída"}).count();
    const countTotal = TasksCollection.find().count();

    return (
        <Box sx={{marginLeft: 35, marginBottom: 5}}>
            <Typography variant="h5" sx={{marginLeft:20, marginBottom: 2}}> Olá, seja bem vindo ao To-Do List!</Typography>
            <Grid container rowSpacing={4} columnSpacing={1}>
                <Grid item size={5}>
                    <Card elevation={4}
                        sx={sxCard}>
                        <CardContent>
                            <Typography variant="h4">Total de tarefas cadastradas</Typography>
                            <Typography variant="h2" sx={{marginTop: 5}}>{countTotal}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={5}>
                    <Card elevation={4}
                        sx={sxCard}>
                        <CardContent>
                            <Typography variant="h4">Total de tarefas concluídas</Typography>
                            <Typography variant="h2" sx={{marginTop: 5}}>{countConcluidas}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={5}>
                   <Card elevation={4}
                        sx={sxCard}>
                        <CardContent>
                            <Typography variant="h4">Total de tarefas a serem concluídas</Typography>
                            <Typography variant="h2" sx={{marginTop: 5}}>{countTotal-countConcluidas}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={5}>
                    <Card elevation={4}
                        sx={{...sxCard, "&:hover":{
                            ...sxCard["&:hover"], cursor:"pointer"}}} onClick={()=>navigate("/home/view")}>
                        <CardContent>
                            <Typography variant="h3" sx={{marginTop: 5}}>Visualizar tarefas</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};