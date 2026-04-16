import { useLocation, useNavigate} from "react-router";
import {Stack, Box, Dialog, DialogTitle, Button, Typography, Chip} from "@mui/material";
import { Close } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import {theme} from "./theme"


export const TaskDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state;

    return(
        <Dialog fullScreen sx={{display: "flex", maxHeight: 500, maxWidth: 600, justifySelf: "center"}} open={true}>
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
                    <Chip color="primary" label={task.situacao}/>
                    {task.tarefaPessoal ? <Chip color="secondary" label="Tarefa Pessoal"/> : ""}
                </Stack>
                <Typography variant="h6">Data da tarefa</Typography>
                <Typography variant="body1" sx={{maxWidth: "70%"}}>{task.data.toLocaleDateString('pt-BR')}</Typography>   
                <Typography variant="h6">Usuário criador da tarefa</Typography>
                <Typography variant="body1">{task.usuarioCriador}</Typography>          
                <Stack sx={{width: "40%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    <Button variant="outlined" onClick={()=>navigate("/home/view/edit", {state: task})}>Editar tarefa</Button>
                </Stack>
            </Box>
        </Dialog>
    );
}