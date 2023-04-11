import { CREATE_POKEMON, GET_POKEMON_NAME, GET_POKEMON, GET_DETAIL, FILTER_POKEMON, FILTER_BY_ORIGIN, ATTACK_ORDER, ALPHABETICAL_ORDER, GET_TYPES, CLEAN_DETAIL } from "./action-types";
import axios from "axios";

export const getPokemon = () => {
    return async (dispatch) => {
        const pokemons = (await axios('http://localhost:3001/pokemons')).data;

        return dispatch({
            type: GET_POKEMON,
            payload: pokemons
        })
    };
};

export const getTypes = () => {
    return async (dispatch) => {
        const types = (await axios('http://localhost:3001/types')).data;

        return dispatch({
            type: GET_TYPES,
            payload: types
        })
    }
}

export const getPokemonDetail = (idPokemon) => {
    return async (dispatch) => {
        const pokemonDetail = (await axios(`http://localhost:3001/pokemons/${idPokemon}`)).data;

        return dispatch({
            type: GET_DETAIL,
            payload: pokemonDetail
        })
    }
}

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        const pokemon = (await axios({params:{name: name}, url: `http://localhost:3001/pokemons`})).data;

        return dispatch({
            type: GET_POKEMON_NAME,
            payload: pokemon
        })
    }
}

export const createPokemon = (form) => {
    return async (dispatch) => {
        const newPokemon = await axios.post(`http://localhost:3001/pokemons`, form);

        return dispatch({
            type: CREATE_POKEMON,
            payload: newPokemon
        })
    }
}

export const filterPokemon = (type) => {
    return { type: FILTER_POKEMON, payload: type }
}

export const filterByOrigin = (origin) => {
    return { type: FILTER_BY_ORIGIN, payload: origin }
}

export const orderAlpha = (order) => {
    return { type: ALPHABETICAL_ORDER, payload: order }
}

export const orderAttack = (order) => {
    return { type: ATTACK_ORDER, payload: order }
}

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL }
}