import React, {useEffect, useState} from 'react';
import { 
    Typography, 
    Link, 
    CircularProgress,
    Button,
    Card,
    CardContent,
    Grid,
    Box
} from '@material-ui/core';
import axios from "axios";
import {useStyles} from "./styles";


const Pokemon = props => {
   console.log("pops: ",props);
    const {history, match} = props;
    const {params} = match;
    const{pokemonId} = params;
    const[pokemon, setPokemon] = useState(undefined);
    const classes = useStyles();

    useEffect(()=>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(function (response){
            const { data } = response;
            setPokemon(data);
        })
        .catch(function(error){
            setPokemon(false);
        })
    },[pokemonId])

    const generatePokemonJSX = () =>{
        const {name, id, species, height, weight, types, sprites}= pokemon;
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        const { front_default } = sprites;
        return (
            <Grid 
            container spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            padding="50">
            <Box m={4} pt={4}>
            <Card sx={{ minWidth: 275 }}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h1">
                        {`${id}.`} {name}
                        <img src={front_default} alt="broken img"/>
                    </Typography>
                    <img style={{width:"300px",height:"300px"}} alt="broken img" src={fullImageUrl}/>
                    <Typography variant="h3">Pokemon Info</Typography>
                    <Typography>
                        {"Species: "}
                        <Link href={species.url}>{species.name}</Link>
                    </Typography>
                    <Typography>height: {height}</Typography>
                    <Typography>Weight: {weight}</Typography>
                    <Typography variant="h6">Types:</Typography>
                    {types.map(typeInfo=>{
                        const {type}=typeInfo;
                        const {name}=type;
                        return <Typography key={name}>{`${name}`}</Typography>
                    })}
                    <Button variant="contained" onClick={() => history.push("/")}>
                    back to pokedex
                    </Button>
            </CardContent>  
            </Card>
            </Box>
            </Grid>
        )
    }
    return (
        <> 
        {pokemon === undefined && <CircularProgress/>}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography> Pokemon not found</Typography>}
        </>);
};

export default Pokemon;
