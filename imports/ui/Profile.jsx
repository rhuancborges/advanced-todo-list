import { Typography, Avatar,  Box, TextField, Button } from "@mui/material";
import {Meteor} from "meteor/meteor";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { Outlet, useNavigate } from "react-router-dom";

export const Profile = () => {
    const isLoading = useSubscribe("currentUser");
    const user = useTracker(()=>Meteor.user());
    const navigate = useNavigate();
    
    if (isLoading()){
        return <Typography>Carregando...</Typography>
    }
    
    return (
        <Box sx={{width: "70%", height: 500, display: "flex", 
        justifyContent: "space-around", alignItems: "center"}}>
            <Box sx={{display: "flex", 
                flexDirection: "column", justifyContent: "space-around", height: "80%"}}>
                <Typography variant="h5" sx={{display: "flex", justifyContent: "center"}}>Foto de Perfil</Typography>
                <Avatar sx={{width: 250, height: 250}} src={user.foto}></Avatar>
                <Button variant="contained" onClick={()=>navigate(`edit`)}>Editar Perfil</Button>
            </Box>
            <Box sx={{ width: "60%", height: "95%", display: "flex", 
            flexDirection: "column", justifyContent: "space-around"}}
               >
                <Typography variant="h5" sx={{display: "flex", justifyContent: "center"}}>Dados do Usuário</Typography>
                <TextField disabled fullWidth label="Nome" value={user.nome}/>
                <TextField disabled fullWidth label="Nome de usuário" value={user.username}/>
                <TextField disabled fullWidth label="E-mail" value={user.emails[0].address}/>
                <TextField disabled fullWidth label="Data de Nascimento" value={user.dataNascimento.toLocaleDateString('pt-BR')}/>
                <TextField disabled fullWidth label="Sexo" value={user.sexo}/>
                <TextField disabled fullWidth label="Empresa em que trabalha" value={user.empresa}/>
            </Box>
            <Outlet/>
        </Box>
    );

};