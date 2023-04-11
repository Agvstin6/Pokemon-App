import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemon, getPokemonByName } from "../../redux/actions";
import style from './NavBar.module.css'
import pokemonTitle from '../../assets/pokemonTitle.png';
import { BsSearch } from 'react-icons/bs';
import {FiRefreshCcw} from 'react-icons/fi'

const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInput = (event) => {
        setName(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getPokemonByName(name))
        event.target.value = ''
    }

    const handleClick = () => {
        dispatch(getPokemon())
    }

    return (
        <div className={style.header}>
            <img src={pokemonTitle} alt="title" className={style.title_page} />
            <div className={style.navContainer}>
                <div className={style.searchbar}>
                    <button onClick={handleClick}><FiRefreshCcw/></button>
                    <input type="search" placeholder="Search pokemons by name" onChange={handleInput} />
                    <button type="submit" onClick={handleSubmit}><BsSearch/></button>
                </div>
                <div className={style.navbar}>
                    <Link to='/home'>HOME</Link>
                    <Link to='/create'>CREATE YOUR OWN POKEMON</Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;