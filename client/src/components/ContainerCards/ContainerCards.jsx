import style from "./ContainerCards.module.css"
import Card from "../Card/Card";
import { useSelector } from "react-redux"
import { useState } from "react";
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";
const POKEMON_ON_SCREEN = 12;

const ContainerCards = () => {
  const pokemons = useSelector(state => state.pokemons);

  const [order, setOrder] = useState('')

  let [currentPage, setCurrentPage] = useState(1);
  const [pokemonOnScreen] = useState(POKEMON_ON_SCREEN);

  const indexOfLastPokemon = currentPage * pokemonOnScreen;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonOnScreen;

  const currentPokemon = pokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const pageSelector = (numberPage) => {
    setCurrentPage(numberPage)
  }
  const prevSelector = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }
  const nextSelector = () => {
    if (currentPage < currentPokemon.length) setCurrentPage(currentPage + 1)
  }

  return (
    <div>
      <Paginado pokemonOnScreen={pokemonOnScreen} pokemons={pokemons.length} pageSelector={pageSelector} prevSelector={prevSelector} nextSelector={nextSelector} />
      <div className={style.principal}>
        <div>
        <Filters setOrder={setOrder} setCurrentPage={setCurrentPage} />
        </div>
        <div className={style.cardContainer}>
          {
            currentPokemon.map((poke) => {
              return (
                <Card
                  key={poke.id}
                  id={poke.id}
                  name={poke.name}
                  image={poke.image}
                  Types={poke.Types}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default ContainerCards;