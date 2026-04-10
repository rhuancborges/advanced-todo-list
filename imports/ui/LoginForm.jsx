import {Box, Typography, Button, Chip, Alert, CardContent} from "@mui/material";
import {React, useState} from "react";
import {Meteor} from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import { FormControl, TextField, Card } from '@mui/material';

export const LoginForm = () => {
    const user = useTracker(() => Meteor.user()); // Para vigiar mudanças de usuário no banco de dados
    // Use states para dados do usuário
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Use states para as mensagens de erro
    const [errorMessage, setErrorMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        
        setErrorMessage(null);
        setIsError(false);
        Meteor.loginWithPassword(username, password, (error) =>{
            if (error){
                setErrorMessage(error.reason);
                setIsError(true);
            }
        });
        setUsername("");
        setPassword("");
    };

    const handleLogout =  () => {
        Meteor.logout();
    }

    return (
    <Box sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
        {/*Se há um erro (controlado pelo use state isError) mostra um componente Alert 
        com a mensagem do erro (controlada pelo use state errorMessage) */}
        {isError ? (
        <Alert severity="error" onClose={function () {setErrorMessage(null); setIsError(false);}} sx={{width: "100%", maxWidth: 400}}>
            {errorMessage}
        </Alert>
        ): <div></div>}
        <Card raised="true">
            <CardContent sx={{p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                <Typography variant="h3" sx={{"fontFamily": "monospace", "font-weight": "bold", "font-size": 30}}>Sign In</Typography>
                <FormControl>
                    <TextField 
                        id="my-input" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
                <FormControl>
                    <TextField 
                        id="my-input" 
                        placeholder="Password" 
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(e)=>handleClick(e)}
                >
                Sign in
                </Button>
            </CardContent>
        </Card>
        <Typography variant="h2">{user ? user.username : "Não há usuário logado"}</Typography>
    </Box>
    );
}