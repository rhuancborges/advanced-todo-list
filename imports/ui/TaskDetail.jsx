import { useLocation, useNavigate, useParams} from "react-router-dom";
import {Stack, Box, Dialog, DialogTitle, Button, ButtonGroup, Typography, Chip} from "@mui/material";
import { Close } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import {theme} from "./theme"
import { colorChip, TASK_STATUS} from "../api/taskStatus"
import {useTracker, useSubscribe} from "meteor/react-meteor-data";
import { TasksCollection } from '../api/TasksCollection';



export const TaskDetail = () => {
    const navigate = useNavigate();
    const {taskId} = useParams();
    const isLoading = useSubscribe('tasks');
    
    const task  = useTracker(()=> {
        return TasksCollection.findOne({_id: taskId});
    });
    
    if (isLoading()){
        return <Dialog open> Carregando</Dialog>;
    };

    const updateTask = (status) => {
        Meteor.call("task.update", task._id, {situacao: status})
    }
    //return(<Dialog fullScreen open>{task._id}</Dialog>)
    return(
        <Dialog fullScreen sx={{display: "flex", justifyContent: "center"}} open={true}>
            <Box sx={{height: "96%", display: "flex", flexDirection: "column", 
                alignItems:"center", justifyContent: "space-between"}}>
                <Stack sx={{width: "95%", height: "1px", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                    <Close sx={{cursor: "pointer", 
                    width: 40, height: 40, p: 1, 
                    borderRadius: "50%", 
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.background.default, 0.45)
                    }}} onClick={()=>navigate("/home/view")}></Close>
                </Stack>
                <DialogTitle>{(task.nome.trim()==="") ? "Tarefa sem nome":`Tarefa "${task.nome}"`}</DialogTitle>
                <Typography variant="h6">Descrição da tarefa</Typography>
                <Typography variant="body1" sx={{maxWidth: "70%"}}>{(task.descricao.trim()==="") ? "Não há descrição" : task.descricao}</Typography>  
                <Typography variant="h6">Situação da tarefa</Typography>
                <Stack sx={{width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    <Chip sx={{backgroundColor: theme.palette[colorChip[task.situacao]].main, color: "black"}} label={task.situacao}/>
                    {task.tarefaPessoal ? <Chip color="secondary" label="Tarefa Pessoal"/> : ""}
                </Stack>
                <Typography variant="h6">Data da tarefa</Typography>
                <Typography variant="body1" sx={{maxWidth: "70%"}}>{task.data.toLocaleDateString('pt-BR')}</Typography>   
                <Typography variant="h6">Usuário criador da tarefa</Typography>
                <Typography variant="body1">{task.usuarioCriador}</Typography> 
                <Typography variant="h6">Mudar situação da tarefa</Typography>         
                <ButtonGroup size="medium" sx={{width: "80%"}}>
                    <Button color="button-cad" disabled={(task.situacao === TASK_STATUS.CADASTRADA)
                    } onClick={() => updateTask(TASK_STATUS.CADASTRADA)}>Cadastrada</Button>
                    <Button color="button-and" disabled={(task.situacao === TASK_STATUS.EM_ANDAMENTO)}
                    onClick={() => updateTask(TASK_STATUS.EM_ANDAMENTO)}>Em andamento</Button>
                    <Button color="button-con" disabled={(task.situacao === TASK_STATUS.CONCLUIDA) || (task.situacao === TASK_STATUS.CADASTRADA)}
                    onClick={() => updateTask(TASK_STATUS.CONCLUIDA)}>Concluída</Button>
                </ButtonGroup>
                <Stack sx={{width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    <Button size="small" variant="outlined" onClick={()=>navigate(`/home/view/edit/${task._id}`)}>Editar tarefa</Button>
                </Stack>
            </Box>
        </Dialog>
    );
}