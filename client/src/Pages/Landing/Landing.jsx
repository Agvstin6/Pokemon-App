import React from "react";
import { Link } from "react-router-dom";
import landing from "../../assets/landingPikachu.webp";
import style from "./Landing.module.css"

const Landing = () => {
    return (
        <div className={style.landingpage}>
            <h1>Welcome Pokemaster!</h1>
            <img src={landing} alt="landingPikachu" width={'300px'}/>
            <span>Find your favorites pokemon here!</span>
            <button className={style.button}>
                <Link to='home'>Enter</Link>
            </button>
        </div>
    )
};

export default Landing;