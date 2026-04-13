import { Card, Typography, Box, Stack, Grid, CardContent } from "@mui/material";
import {theme} from "./theme"

export const Dashboard = () => {
    return (
        <Box sx={{marginLeft: 25}}>
            <Grid container rowSpacing={4} columnSpacing={5} >
                <Card>
                    <CardContent>1</CardContent>
                </Card>
                <Card>
                    <CardContent>2</CardContent>
                </Card>
            </Grid>
            <Grid container rowSpacing={4} columnSpacing={5} >
                <Card>
                    <CardContent>1</CardContent>
                </Card>
                <Card>
                    <CardContent>2</CardContent>
                </Card>
            </Grid>
        </Box>
    );
};