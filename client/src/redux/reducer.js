import { ALPHABETICAL_ORDER, ATTACK_ORDER, CLEAN_DETAIL, CREATE_POKEMON, FILTER_BY_ORIGIN, FILTER_POKEMON, GET_DETAIL, GET_POKEMON, GET_POKEMON_NAME, GET_TYPES } from "./action-types";

const initialState = {
    pokemons: [],
    allPokemon: [],
    pokemonDetail: {},
    newPokemon: [],
    pokemonTypes: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMON:
            return { ...state, pokemons: action.payload, allPokemon: action.payload };

        case GET_TYPES:
            return { ...state, pokemonTypes: action.payload}

        case GET_DETAIL:
            return { ...state, pokemonDetail: action.payload };

        case GET_POKEMON_NAME:
            return {...state, pokemons: action.payload};
            
        case CREATE_POKEMON:
            return {...state, newPokemon: [...state.newPokemon, action.payload]}

        case FILTER_POKEMON:
            const pokemonFiltered = action.payload === 'all'
                ? state.allPokemon
                : state.allPokemon.filter(poke => poke.Types[0]?.name === action.payload || poke.Types[1]?.name === action.payload);
            return { ...state, pokemons: pokemonFiltered };

        case FILTER_BY_ORIGIN:
            const filterOrigin = action.payload === 'created' ? state.allPokemon.filter(poke => poke.created) : state.allPokemon.filter(poke => !poke.created)
            return { ...state, pokemons: action.payload === 'all' ? state.allPokemon : filterOrigin }

        case ALPHABETICAL_ORDER:
            const alphaOrdered = action.payload === 'upward'
                ? state.pokemons.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                })
                : state.allPokemon.sort((a, b) => {
                    if (b.name < a.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })
            return {
                ...state,
                pokemons: action.payload === 'standard' ? state.allPokemon : alphaOrdered
            }

        case ATTACK_ORDER:
            // action.payload === 'upward'
            //     ? state.pokemons.sort((a, b) => a.attack - b.attack)
            //     : state.pokemons.sort((a, b) => b.attack - a.attack)
            let attackOrdered;
            if(action.payload === 'standard') attackOrdered = state.allPokemon;
            if(action.payload === 'upward') attackOrdered = state.pokemons.sort((a, b) => a.attack - b.attack);
            if(action.payload === 'downward') attackOrdered = state.pokemons.sort((a, b) => b.attack - a.attack)
            return {
                ...state,
                pokemons: attackOrdered
            }
        
        case CLEAN_DETAIL:
            return{
                ...state,
                pokemonDetail: {}
            }
        default:
            return { ...state }
    }
}


export default reducer;