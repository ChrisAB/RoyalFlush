import React from 'react';
import {useCallback} from "react";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import Street from "../Assets/parking.jpg"
import "./style.css"
import {Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import Grid from "@mui/material/Grid";

function Particle() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    return (
        <div className="wrapper">

            <Particles
                id="particles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={
                    {
                        background: {
                            // color: '#808080'
                            image: `url(${Street})`,
                            size: "100%",
                            opacity: 1,
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 150,
                                    duration: 0.1,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                directions: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 2,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 100,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: {min: 1, max: 5},
                            },
                        },
                        detectRetina: true,
                    }
                }
            />,
            <Grid container  direction="column" justifyContent="center" alignItems="center">
                <Grid item className="title">
                    <h1>Park your car smarter</h1>
                </Grid>
                <Grid item className="subtitle">
                    <h2>Life is too short to search for the perfect parking spot by yourself</h2>
                </Grid>
                <Grid item className='button'>
                    <Button variant="contained" component={Link} to="/maps">
                        MAPS
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Particle;
