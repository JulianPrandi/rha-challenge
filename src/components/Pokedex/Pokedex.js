import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Typography,
    TextField
} from "@material-ui/core";
import {useStyles} from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { FormatAlignCenter } from '@material-ui/icons';


const Pokedex = props => {
    const {history}=props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter,setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    useEffect(()=>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=400`)
        .then(response=>{
            const {data}=response;
            const {results}=data;
            const newPokemonData={};
            results.forEach((pokemon, index)=> {
                newPokemonData[index+1]={
                    id: index+1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        index + 1
                      }.png`,
                }
            });
            setPokemonData(newPokemonData)
        });
    },[])

    const getPokemonCard = (pokemonId) => {
        const {id, name, sprite} = pokemonData[pokemonId];
        return(
        <Grid item xs={12} sm={3} key={pokemonId}>
            <Card onClick = {()=>history.push(`/${pokemonId}`)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={sprite}
                    style={{width: "130px", height: "130px"}}
                />
                <CardContent className={classes.cardContent}>
                    <Typography>{`${id}.${name}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
        )
    }

    return (
        <>
        <AppBar position="static" className={classes.tul}>
            <Toolbar >
                <div className={classes.searchContainer} data-testid="test1">
                <Grid data-testid="test3">
                    <Typography variant="h1" > Pokedex </Typography>
                    <SearchIcon className={classes.searchIcon}/>
                    <TextField 
                    onChange={handleSearchChange}
                    label="Inserte un nombre"
                    variant="standard"
                    >
                    </TextField>
                </Grid>
                </div>
                
                
            </Toolbar>
        </AppBar>
        {pokemonData ? (
        <Grid data-testid="test2" container spacing={2} className={classes.pokedexContainer}>
           {
               Object.keys(pokemonData).map(pokemonId=>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId))
           }
        </Grid>
        ):(
            <CircularProgress/>
        )}
        
        </>
    );
};

export default Pokedex;
