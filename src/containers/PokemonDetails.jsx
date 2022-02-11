import {
  CircularProgress,
  Box,
  Typography,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POKEMON_API_URL } from "../config";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { toggleFavorite } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    height: "84vh",
    backgroundColor: "black",
    color: "white",
    marginTop: 75,
    textAlign: "center",
    borderRadius: 5,
    paddingTop: 30,
  },
  textTitle: {
    textTransform: "upperCase",
    fontFamily: "Fantasy",
    textDecoration: "none",
  },
  pokemonImage: {
    width: "170px",
    height: "170px",
  },
  pokemonInfoContainer: {
    bottom: 60,
    position: "absolute",

    width: "100%",
  },
  separator: {
    height: "0.01mm",
    width: "95%",
  },
  favorite: {
    height: 50,
    width: 50,
    marginTop: 15,
  },
  text: {
    fontSize: "30px",
  },
}));

const PokemonDetails = (props) => {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const params = useParams();
  const id = params.id;
  console.log(id);
  useEffect(() => {
    axios.get(POKEMON_API_URL + "/" + id).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setState({ pokemon: response.data });
      }
    });
  }, [id]);

  function favoriteChecker(pokemon) {
    let found = false;
    state !== null &&
      props.favorites?.map((p) => {
        if (p.id === pokemon.id) {
          found = true;
        }
        return found;
      });
    return found;
  }

  return (
    <Box>
      {state === null && (
        <CircularProgress style={{ marginTop: 100 }}></CircularProgress>
      )}
      {state !== null && (
        <Box className={classes.pokedexContainer}>
          <Typography variant="h1" className={classes.textTitle}>
            {state.pokemon.name}
          </Typography>
          <img
            className={classes.pokemonImage}
            alt=""
            src={state.pokemon.sprites.front_default}
          />
          <Box className={classes.pokemonInfoContainer}>
            <hr className={classes.separator}></hr>
            <Grid container>
              <Grid item md={1}>
                <Button
                  className={classes.favorite}
                  onClick={() => {
                    props.toggleFavorite(state.pokemon);
                  }}
                >
                  <FavoriteIcon
                    style={{
                      color: favoriteChecker(state.pokemon) ? "red" : "white",
                      fontSize: "50",
                    }}
                  />
                </Button>
              </Grid>
              <Grid item md={2}>
                <Typography className={classes.text}>
                  Name <br />
                  {state.pokemon.name}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography className={classes.text}>
                  Height <br />
                  {state.pokemon.height}m
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography className={classes.text}>
                  Weight <br />
                  {state.pokemon.weight}kg
                </Typography>
              </Grid>

              {state.pokemon.types.map((pokemonType) => {
                const { name } = pokemonType.type;
                return (
                  <Grid item md={2}>
                    <Typography className={classes.text}>
                      Type <br />
                      {name}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};
const mapStateToProps = (state) => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFavorite: (pokemon) => dispatch(toggleFavorite(pokemon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);
