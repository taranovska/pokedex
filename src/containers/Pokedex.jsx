import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IMAGE_API_URL, POKEMON_API_URL } from "../config";
import { nanoid } from "nanoid";
import PokemonCard from "../components/PokemonCard";

const useStyles = makeStyles((theme) => ({
  pokedoxContainer: {
    textAlign: "center",
    padding: "70px 10px 0px 10px",
    backgroundColor: "rgb(68, 68, 68)",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    axios.get(POKEMON_API_URL + "?limit=400").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const { results } = response.data;
        let newPokemonData = [];
        results.forEach((pokemon, index) => {
          index++;
          let pokemonObject = {
            id: index,
            url: IMAGE_API_URL + index + ".png",
            name: pokemon.name,
          };
          newPokemonData.push(pokemonObject);
        });
        setPokemonData(newPokemonData);
      }
    });
  }, []);

  return (
    <Box>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedoxContainer}>
          {pokemonData.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                image={pokemon.url}
                key={pokemon.id}
              ></PokemonCard>
            );
          })}
        </Grid>
      ) : (
        <CircularProgress style={{ marginTop: 100 }}></CircularProgress>
      )}
    </Box>
  );
};

export default Pokedex;
