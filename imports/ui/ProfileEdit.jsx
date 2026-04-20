import { Typography, Avatar,  Box, TextField, Button, Dialog, Stack, Menu, MenuItem } from "@mui/material";
import { Close } from "@mui/icons-material";
import {alpha} from "@mui/material/styles"
import {theme} from "./theme"
import {Meteor} from "meteor/meteor";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

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

    const [ancora, setAncora] = useState(null);
    const [openDialog, setOpenDialog] = useState(true);
    const open = Boolean(ancora);
    const inputFileRef = useRef(null);
    const navigate = useNavigate();
    
    if (isLoading()){
        return <Typography>Carregando...</Typography>
    }

    const handleClick = (e) => {
        setAncora(e.currentTarget);
    }

    const handleClose = () => {
        setAncora(null);
    }

    const handleAlterar = () => {
        handleClose();
        inputFileRef.current?.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader();

        reader.onloadend = () => {
            setFoto(reader.result)
        }

        reader.readAsDataURL(file);

        event.target.value = ""
    }

    const update = () => {
        Meteor.call("users.update", {
            nome: nome,
            username: username,
            sexo: sexo,
            email: email,
            dataNascimento: data,
            empresa: empresa,
            foto: foto
        });
        navigate("/home/profile");        
    }

    return (
      <Dialog
        open={true}
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
            <Box sx={{backgroundColor: "black", width: "80%", height: 500, display: "flex", 
            justifyContent: "space-around", alignItems: "center"}}>
                <Box sx={{display: "flex", 
                    flexDirection: "column", justifyContent: "space-around", height: "80%"}}>
                    <Typography variant="h5" sx={{display: "flex", justifyContent: "center"}}>Foto de Perfil</Typography>
                    <Menu anchorEl={ancora} open={open} onClose={handleClose}>
                        <MenuItem onClick={()=>handleAlterar()}>Alterar foto de perfil</MenuItem>
                        <MenuItem onClick={()=>setFoto("")}>Remover foto de perfil</MenuItem>
                    </Menu>
                    <Avatar sx={{width: 250, height: 250, "&:hover":{cursor:"pointer"}}} src={foto} onClick={(e)=>handleClick(e)}></Avatar>
                    <Button variant="contained" onClick={()=>update()}>Salvar mudanças</Button>
                    <input ref={inputFileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}/>
                </Box>
                <Box sx={{ width: "60%", height: "95%", display: "flex", 
                flexDirection: "column", justifyContent: "space-around"}}
                >
                    <Typography variant="h5" sx={{display: "flex", justifyContent: "center"}}>Dados do Usuário</Typography>
                    <TextField fullWidth label="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    <TextField fullWidth label="Nome de usuário" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <TextField fullWidth label="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField fullWidth type="date" label="Data de Nascimento" 
                    value={data.toISOString().split('T')[0]} onChange={(e)=>setData(e.target.value)}/>
                    <TextField fullWidth label="Sexo" value={sexo} onChange={(e)=>setSexo(e.target.value)}/>
                    <TextField fullWidth label="Empresa em que trabalha" value={empresa} onChange={(e)=>setEmpresa(e.target.value)}/>
                </Box>
            </Box>
        </Dialog>
    );

};