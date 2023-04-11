import style from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPokemonDetail, cleanDetail } from '../../redux/actions';

const Detail = () => {
    const { idPokemon } = useParams();
    const pokemonDetail = useSelector(state => state.pokemonDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetail(idPokemon))
        return () => {
            dispatch(cleanDetail())
        }
    }, [dispatch, idPokemon])

    return (
        <div className={style.detailPokemon}>
            <div className={style.imagePokemon}>
                <img src={pokemonDetail.image} alt="pokemon" />
            </div>
            <div className={style.data}>
                <div className={style.nameData}>
                    <h2>#{pokemonDetail.id}</h2>
                    <h1>{pokemonDetail.name}</h1>
                </div>
                <div className={style.typesData}>
                    {
                        pokemonDetail?.Types?.map((type, index) => {

                            return (
                                <h3 key={index}>{type.name}</h3>
                            )
                        })
                    }
                </div>
                <h2>STATS:</h2>
                <div className={style.statsData}>
                    <span>HP:{pokemonDetail.hp}</span>
                    <br />
                    <span>ATTACK:{pokemonDetail.attack}</span>
                    <br />
                    <span>DEFENSE:{pokemonDetail.defense}</span>
                    <br />
                    {pokemonDetail.speed ? <span>SPEED:{pokemonDetail.speed}</span> : <></>}
                    <br />
                    {pokemonDetail.height ? <span>HEIGHT:{pokemonDetail.height}</span> : <></>}
                    <br />
                    {pokemonDetail.weight ? <span>WEIGHT:{pokemonDetail.weight}</span> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Detail