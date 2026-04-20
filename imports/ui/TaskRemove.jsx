import { useNavigate, useParams } from "react-router-dom";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { TasksCollection } from "../api/TasksCollection";
import {Meteor} from "meteor/meteor";
import { Dialog, Box, Stack, DialogTitle, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import {alpha} from "@mui/material/styles"
import { theme } from "./theme";


export const TaskRemove = () =>{
    const navigate = useNavigate();
    const {taskId} = useParams();
    const isLoading = useSubscribe("tasks");
    const {task, isOwner} = useTracker(() => {
        const task = TasksCollection.findOne(taskId);
        const user = Meteor.user();
        const isOwner = task.usuarioCriador === user.username;
        return {task: task, isOwner: isOwner};
    });

    if (isLoading()){
        return <Dialog open>Carregando</Dialog>
    }

    if(!isOwner){
        return(<Dialog open={true}>
            <Box sx={{height: "100%", display: "flex", flexDirection: "column", 
                alignItems:"center", justifyContent: "space-around"}}>
                <Stack sx={{width: "80%", height: "1px", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                    <Close sx={{cursor: "pointer", 
                    width: 40, height: 40, p: 1, 
                    borderRadius: "50%", 
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.background.default, 0.45)
                    }}} onClick={()=>navigate("/home/view")}></Close>
                </Stack>
                <DialogTitle sx={{width: "60%"}}>{`Você não pode remover essa tarefa porque ela pertence ao usuário ${task.usuarioCriador}`}</DialogTitle>
            </Box>
        </Dialog>
        );
    }

    const remover = () => {
        Meteor.call("task.remove", task._id);
        navigate("/home/view");
    };

    return(
    <Dialog open={true}>
        <Box sx={{height: "96%", display: "flex", flexDirection: "column", 
            alignItems:"center", justifyContent: "space-around"}}>
            <Stack sx={{width: "80%", height: "1px", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Close sx={{cursor: "pointer", 
                width: 40, height: 40, p: 1, 
                borderRadius: "50%", 
                "&:hover": {
                    backgroundColor: alpha(theme.palette.background.default, 0.45)
                }}} onClick={()=>navigate("/home/view")}></Close>
            </Stack>
            <DialogTitle sx={{width: "60%"}}>{`Tem certeza que quer remover a tarefa "${task.nome}"?`}</DialogTitle>
            <Stack sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <Button variant="outlined" onClick={()=>navigate("/home/view")}>Cancelar</Button>
                <Button variant="contained" onClick={()=> remover()}>Remover</Button>
            </Stack>
        </Box>
    </Dialog>
    );

}