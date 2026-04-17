import { Typography, Avatar,  Box, TextField, Button, Dialog, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import {alpha} from "@mui/material/styles"
import {theme} from "./theme"
import {Meteor} from "meteor/meteor";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ProfileEdit = () => {
    const isLoading = useSubscribe("currentUser");
    const user = Meteor.user();

    const [nome, setNome] = useState(user.nome);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.emails[0].address);
    const [data, setData] = useState(user.dataNascimento);
    const [sexo, setSexo] = useState(user.sexo);
    const [empresa, setEmpresa] = useState(user.empresa);
    const [foto, setFoto] = useState(user.foto);

    const navigate = useNavigate();
    
    if (isLoading()){
        return <Typography>Carregando...</Typography>
    }

    const update = () => {
        
    }
    return (
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md" // Faz o dialog ser grande (Medium, Large ou XL)
        slotProps={{
            paper: {
            sx: {
                minHeight: '90vh', // Ocupa 80% da altura da tela
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Centraliza verticalmente
                alignItems: 'center',     // Centraliza horizontalmente
            },
            },
        }}
        >
            <Stack sx={{backgroundColor: "blue", width: "80%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                    <Close sx={{cursor: "pointer", 
                    width: 40, height: 40, p: 1, 
                    borderRadius: "50%", 
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.background.default, 0.45)
                    }}} onClick={()=>navigate("/home/profile")}></Close>
                </Stack>
            <Box sx={{backgroundColor: "black", width: "70%", height: 500, display: "flex", 
            justifyContent: "space-around", alignItems: "center"}}>
                <Box sx={{display: "flex", 
                    flexDirection: "column", justifyContent: "space-around", height: "80%"}}>
                    <Typography variant="h5" sx={{display: "flex", justifyContent: "center"}}>Foto de Perfil</Typography>
                    <Avatar sx={{width: 250, height: 250}} src={user.foto}></Avatar>
                    <Button variant="contained" onClick={()=>update()}>Editar Perfil</Button>
                </Box>
                <Box sx={{ width: "60%", height: "95%", display: "flex", 
                flexDirection: "column", justifyContent: "space-around"}}
                >
                    <Typography variant="h5" sx={{display: "flex", justifyContent: "center"}}>Dados do Usuário</Typography>
                    <TextField fullWidth label="Noma" value={nome}/>
                    <TextField fullWidth label="Nome de usuário" value={username}/>
                    <TextField fullWidth label="E-mail" value={email}/>
                    <TextField fullWidth type="date" label="Data de Nascimento" value={data.toISOString().split('T')[0]}/>
                    <TextField fullWidth label="Sexo" value={sexo}/>
                    <TextField fullWidth label="Empresa em que trabalha" value={empresa}/>
                </Box>
            </Box>
        </Dialog>
    );

};