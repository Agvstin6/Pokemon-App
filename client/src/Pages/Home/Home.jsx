import ContainerCards from "../../components/ContainerCards/ContainerCards"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemon, getTypes } from "../../redux/actions";
import pokeball from '../../assets/pokeball.gif';
import style from './Home.module.css'


const Home = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        dispatch(getPokemon())
        dispatch(getTypes())
        setTimeout(()=>{
            setLoading(false)
        },2000)
    },[dispatch]);

    return (
        <div className={style.home}>
            {
            loading
            ? <div className={style.loadingDiv}><img src={pokeball} alt="loading..." className={style.loading}/><span>loading...</span></div>
            :<ContainerCards />   
            }
        </div>
    )
}

export default Home