
const { createPokemon, pokemonById, getAllPokemon, getAllTypes } = require('../controllers/controllers')


//-----------POKEMON-HANDLERS---------------//

const getPokemons = async (req, res) => {
    const { name } = req.query;
    try {
        const allPokemons = await getAllPokemon(name);
        res.status(200).json(allPokemons)
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
};

const getPokemonById = async (req, res) => {
    const { idPokemon } = req.params;
    try {
        const pokemon = await pokemonById(idPokemon)
        res.status(200).json(pokemon)
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error.message)
    }
};

const postPokemon = async (req, res) => {
    const { name, image, hp, attack, defense, speed, height, weight, typeId } = req.body;
    try {
        const newPokemon = await createPokemon(name, image, hp, attack, defense, speed, height, weight, typeId)
        res.status(201).send(`The Pokemon ${name} was created successfully`)
    } catch (error) {
        res.status(400).send(error.message)
    }
};

//-------------------TYPES-HANDLER-------------------//

const getTypes = async (req, res) => {
    try {
        const allTypes = await getAllTypes()
        res.status(200).json(allTypes)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getPokemonById, getPokemons, postPokemon, getTypes
}