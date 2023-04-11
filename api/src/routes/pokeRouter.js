const { Router } = require('express');
const handler = require('../handlers/handlers');


const pokeRouter = Router();

//const validatePost

pokeRouter.get('/', handler.getPokemons);

pokeRouter.get('/:idPokemon', handler.getPokemonById);

pokeRouter.post('/', handler.postPokemon);

module.exports = pokeRouter;