import style from './Filters.module.css'
import { useDispatch } from "react-redux";
import { filterByOrigin, filterPokemon, orderAlpha, orderAttack } from "../../redux/actions";


const Filters = ({ setCurrentPage, setOrder }) => {
    const dispatch = useDispatch();

    const handlerFilterByType = (event) => {
        dispatch(filterPokemon(event.target.value));
    }
    const handlerFilterByOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
    }
    const handlerAlphaOrder = (event) => {
        event.preventDefault()
        setCurrentPage(1)
        setOrder(`Ordered in ${event.target.value}`)
        dispatch(orderAlpha(event.target.value))
    }
    const handlerAttackOrder = (event) => {
        event.preventDefault()
        setCurrentPage(1)
        setOrder(`Ordered in ${event.target.value}`)
        dispatch(orderAttack(event.target.value))
    }

    return (
        <div className={style.filterContainer}>
            <h5>Filter By</h5>
            <div className={style.selectContainer}>
                <label>Type</label>
                <select onChange={handlerFilterByType}>
                    <option value="all">All</option>
                    <option value="normal">Normal</option>
                    <option value="flying">Flying</option>
                    <option value="ground">Ground</option>
                    <option value="fighting">Fighting</option>
                    <option value="poison">Poison</option>
                    <option value="rock">Rock</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                    <option value="unknown">Unknown</option>
                    <option value="shadow">Shadow</option>
                </select>
            </div>
            <div className={style.selectContainer}>
                <label>Origin</label>
                <select onChange={handlerFilterByOrigin}>
                    <option value="all">All</option>
                    <option value='noCreated'>Original</option>
                    <option value='created'>Created</option>
                </select>
            </div>
            <h5>Order By</h5>
            <div className={style.selectContainer}>
                <label>Alphabetical</label>
                <select onChange={handlerAlphaOrder}>
                    <option value="standard">Standard</option>
                    <option value="upward">A - Z</option>
                    <option value="downward">Z - A</option>
                </select>
            </div>
            <div className={style.selectContainer}>
                <label>Attack</label>
                <select onChange={handlerAttackOrder}>
                    <option value="standard">Standard</option>
                    <option value="upward">Upwards</option>
                    <option value="downward">Downwards</option>
                </select>
            </div>
        </div>
    )
};

export default Filters;