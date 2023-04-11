const { Pokemon, Type } = require('../db')
const axios = require('axios');
const { Op } = require('sequelize')

//-------------------POKEMON-CONTROLLERS--------------------------//

//---POST----//
const createPokemon = async (name, image, hp, attack, defense, speed, height, weight, typeId) => {
  if (!name || !image || !hp || !attack || !defense || !typeId) throw new Error('No has ingresado todos los datos necesarios')

  const pkmnRepeated = await Pokemon.findOne({ where: { name: name } });
  if (pkmnRepeated) throw new Error('Ya existe un pokemon con ese nombre')

  name = name.toLowerCase()
  const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });
  await newPokemon.setTypes(typeId)

  return newPokemon;
};


//---GET-POKEMON----//
const getAllPokemon = async (name) => {
  if (!name) {
    const pokemonBDD = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {attributes: []}
      }
    });

    const allPokemon = (await axios(`https://pokeapi.co/api/v2/pokemon?limit=48`)).data.results;
    const pokemonApi = allPokemon.map(async (poke) => {
      const response = (await axios(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)).data
      const pokemons = {
        id: response.id,
        attack: response.stats[1].base_stat,
        name: response.name,
        image: response.sprites.front_default,
        Types: response.types.map(types => { return { name: types.type.name } }),
        created: false
      }
      return pokemons
    });
    const pkmn = await Promise.all(pokemonApi)

    return [...pokemonBDD, ...pkmn];


  }
  else {
    name = name.toLowerCase()

    const pokeBDD = await Pokemon.findOne({
      raw: true,
      where: {
        name: name,
      }
    });

    if (pokeBDD) return [pokeBDD]

    const response = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
    const pokemonApi = {
      id: response.id,
      attack: response.stats[1].base_stat,
      name: response.name,
      image: response.sprites.front_default,
      Types: response.types.map(types => { return { name: types.type.name } }),
      created: false
    }


    return [pokemonApi]
  }
};


//---GET-DETAIL----//
const pokemonById = async (idPokemon) => {
  if (isNaN(idPokemon)) {
    const pokemonDB = await Pokemon.findByPk(idPokemon, {
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    })
    return pokemonDB
  }
  else {
    const response = (await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)).data;
    let pokemon = {
      id: response.id,
      name: response.name,
      image: response.sprites.front_default,
      Types: response.types.map(types => { return { name: types.type.name } }),
      hp: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      defense: response.stats[2].base_stat,
      speed: response.stats[5].base_stat,
      height: response.height,
      weight: response.weight,
      created: false
    }
    return pokemon;
  }
};

//-----------------------TYPES-CONTROLLER--------------------------//

const getAllTypes = async () => {
  const types = (await axios('https://pokeapi.co/api/v2/type')).data.results;

  types.forEach(type => {
    Type.findOrCreate({ where: { name: type.name } })
  });

  const isFilled = await Type.findAll()

  return isFilled;
}
module.exports = { createPokemon, pokemonById, getAllPokemon, getAllTypes } 