import { Button, Dialog, DialogTitle, FormControlLabel, 
    FormGroup, Box, Stack, Switch, TextField, 
    ToggleButton, ToggleButtonGroup, Typography,
    InputLabel} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {useTracker, useSubscribe} from "meteor/react-meteor-data"
import { TASK_STATUS } from "../api/taskStatus";
import { Close } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import {theme} from "./theme";
import {Meteor} from "meteor/meteor";
import { TasksCollection } from "../api/TasksCollection";


export const TaskEdit = () => {
    const navigate = useNavigate();
    const {taskId} = useParams();
    const isLoading = useSubscribe("tasks");
    const {task, isOwner} = useTracker(()=>{
        const task = TasksCollection.findOne(taskId);
        const user = Meteor.user();
        const isOwner = task.usuarioCriador === user.username;
        return {task: task, isOwner: isOwner};
    });
    const [nome, setNome] = useState(task.nome);
    const [descricao, setDescricao] = useState(task.descricao);
    const [status, setStatus] = useState(task.situacao);
    const [date, setDate] = useState((task.data).toISOString().split('T')[0]);
    const [isPessoal, setIsPessoal] = useState(task.tarefaPessoal);
    const [nomeErro, setNomeErro] = useState(false);

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
                <DialogTitle sx={{width: "60%"}}>{`Você não pode editar essa tarefa porque ela pertence ao usuário ${task.usuarioCriador}`}</DialogTitle>
            </Box>
        </Dialog>
        );
    }
    
    
    const atualizar = () => {
        if(nome.trim()===""){
            setNomeErro(true);
            return;
        }

        const newTask = {
            nome: nome.trim(),
            descricao: descricao,
            situacao: status,
            data: new Date(date + "T00:00:00"),
            tarefaPessoal: isPessoal,
            createdAt: task.createdAt,
            updatedAt: new Date()
        }

        Meteor.call("task.update", task._id, newTask);
        navigate("/home/view")
    }
    return (
        <Dialog fullScreen={true} open={true}>
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
                <DialogTitle>{`Editando tarefa ${task.nome}`}</DialogTitle>
                <TextField sx={{minWidth: "60%"}} label="Nome da Tarefa" value={nome} 
                error={nomeErro} onChange={(e) => {
                    setNome(e.target.value)
                    if (nome.trim() !== ""){
                        setNomeErro(false);
                    }}}/>
                <TextField sx={{minWidth: "60%"}} multiline label="Descrição da Tarefa" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                <ToggleButtonGroup color="primary" exclusive value={status} onChange={(e, n) => setStatus(n)}>
                    <ToggleButton value={TASK_STATUS.CADASTRADA}>{TASK_STATUS.CADASTRADA}</ToggleButton>
                    <ToggleButton value={TASK_STATUS.EM_ANDAMENTO}>{TASK_STATUS.EM_ANDAMENTO}</ToggleButton>
                    <ToggleButton value={TASK_STATUS.CONCLUIDA}>{TASK_STATUS.CONCLUIDA}</ToggleButton>
                </ToggleButtonGroup>
                <TextField sx={{minWidth: "60%"}} type="date" label="Data da tarefa"
                value={date} onChange={(e) => setDate(e.target.value)} />
                <FormGroup>
                    <FormControlLabel control={<Switch checked={isPessoal} 
                    onChange={() => setIsPessoal(!isPessoal)}/>} label="Tarefa Pessoal"/>
                </FormGroup>
                <Stack sx={{width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    <Button variant="outlined" onClick={()=>navigate("/home/view")}>Cancelar</Button>
                    <Button variant="contained" onClick={()=> atualizar()}>Concluir</Button>

                </Stack>
            </Box>
        </Dialog>
    );
};