import { Link } from "react-router-dom";
import style from './Card.module.css'


const Card = (props) => {
    return (
        <div className={style.card}>
            <Link to={`detail/${props.id}`}>
                <div className={style.imgContainer}>
                <img src={props.image} alt="pokemon" />
                </div>
                    <h4 className={style.name}>{props.name}</h4>
                <div className={style.data}>
                    <div className={style.types}>
                        {
                            props?.Types?.map((type, index) => {
                                return (
                                    <span key={index}>{type.name}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default Card;