import React from "react";
import styles from "./styles.module.css"
import img from "./imgae.jpeg"
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ClassIcon from '@mui/icons-material/Class';  
import LocalParkingIcon from '@mui/icons-material/LocalParking';

export const SpotDetails = (props) => {
    const {spotDetails} = props;
    return spotDetails && <>
        <Grid item md={1} style={{width: "100%", display: "flex", justifyContent: "start", alignItems: "center", font: "Arial"}}>
            <Typography style={{fontSize: "22px", marginLeft: "15px"}} variant="subtitle1">
                {spotDetails?.name}
            </Typography>
        </Grid>        
        <Grid item style={{width: "100%", display: "flex", justifyContent: "start", alignItems: "center", font: "Arial"}}>
            <LocalParkingIcon style={{ marginLeft: "15px"}}/>
            <Typography style={{fontSize: "18px", marginLeft: "10px"}} variant="subtitle1">
                Total parking spots: {spotDetails?.totalNumberOfSpots}
            </Typography>     
        </Grid>
        <Grid item style={{width: "100%", display: "flex", justifyContent: "start", alignItems: "center", font: "Arial"}}>
                <AssignmentTurnedInIcon style={{ marginLeft: "15px"}}/>
                <Typography style={{fontSize: "18px", marginLeft: "10px"}} variant="subtitle1">
                    Empty parking spots: {spotDetails?.numberOfFreeSpots}
                </Typography>

        </Grid>
        <Grid item style={{width: "100%", display: "flex", justifyContent: "start", alignItems: "center", font: "Arial"}}>
            <ClassIcon style={{ marginLeft: "15px"}}/>
            <Typography style={{fontSize: "18px", marginLeft: "10px"}} variant="subtitle1">
                Category: {spotDetails?.parkingCategory}
            </Typography>     
        </Grid>
    </>
}