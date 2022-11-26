import React from "react";
import styles from "./styles.module.css"
import img from "./imgae.jpeg"
import Grid from '@mui/material/Grid'

export const SpotDetails = () => {
    return <Grid
        style={{ height: "100vh" }}
        //alignItems="stretch"

        container
        //spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{background: "gray"}}
    >
        <Grid item xs={12} style={{textAlign: "center"}}>
            something
        </Grid>
        <Grid item xs={12} style={{textAlign: "center"}}>
            another
        </Grid>
    </Grid>
}