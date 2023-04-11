import style from './Paginado.module.css';
import {GrNext,GrPrevious} from 'react-icons/gr'

const Paginado = ({ pokemonOnScreen, pokemons, pageSelector, prevSelector, nextSelector}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pokemons / pokemonOnScreen); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className={style.navPages}>
            <button onClick={prevSelector} className={style.button}><GrPrevious/></button>
            <ul className={style.pagelist}>
                {
                    pageNumbers.map((number) => {
                        return (
                            <li key={number} className={style.page}>
                                <a onClick={() => pageSelector(number)}>{number}</a>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={nextSelector} className={style.button}><GrNext/></button>
        </nav>
    )
};

export default Paginado;