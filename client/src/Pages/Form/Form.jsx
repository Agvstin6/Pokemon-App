import { useState } from "react";
import { useSelector } from "react-redux";
import validation from "./validation";
import style from './Form.module.css';
import { useDispatch } from "react-redux";
import { createPokemon } from "../../redux/actions";
import axios from "axios";
import Card from "../../components/Card/Card";

const Form = () => {
    const pokemonTypes = useSelector(state => state.pokemonTypes)
    const dispatch = useDispatch()
    const pokemonCreated = useSelector(state => state.newPokemon)
    console.log(pokemonCreated);
    const [form, setForm] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: undefined,
        height: undefined,
        weight: undefined,
        typeId: []
    });
    const [errors, setErrors] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: undefined,
        height: undefined,
        weight: undefined,
        typeId: []
    })

    console.log(form);

    const handleInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
        setErrors(
            validation({
                ...form,
                [event.target.name]: event.target.value
            })
        );
    };

    const handleSelect = (event) => {
        setForm({
            ...form,
            typeId: [...form.typeId, event.target.value]
        })
        setErrors(
            validation({
                ...form,
                typeId: [...form.typeId, event.target.value]
            })
        )
    }

    const handleClick = (elem) => {
        setForm({
            ...form,
            typeId: form.typeId.filter(type => type !== elem)
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(createPokemon(form))
        setForm({
            name: '',
            image: '',
            hp: '',
            attack: '',
            defense: '',
            speed: undefined,
            height: undefined,
            weight: undefined,
            typeId: []
        })
    }

    return (
        <div>
            <span>enter the necessary data to create your pokemon!</span>
        <div className={style.createPokemon}>
            <div>
                <form onSubmit={submitHandler} className={style.form}>
                    <div className={style.inputs}>
                        <div className={style.styledInput}>
                            <label htmlFor="name">Name*</label>
                            <input name="name" type="text" value={form.name} onChange={handleInput} />
                            {errors.name && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.name}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="image">Image*</label>
                            <input name="image" type="text" value={form.image} onChange={handleInput} />
                            {errors.image && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.image}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="hp">HP*</label>
                            <input name="hp" type="number" value={form.hp} onChange={handleInput} />
                            {errors.hp && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.hp}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="attack">ATTACK*</label>
                            <input name="attack" type="number" value={form.attack} onChange={handleInput} />
                            {errors.attack && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.attack}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="defense">DEFENSE*</label>
                            <input name="defense" type="number" value={form.defense} onChange={handleInput} />
                            {errors.defense && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.defense}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="speed">SPEED</label>
                            <input name="speed" type="number" value={form.speed} onChange={handleInput} />
                            {errors.speed && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.speed}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="height">Height</label>
                            <input name="height" type="number" value={form.height} onChange={handleInput} />
                            {errors.height && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.height}</span>}
                        </div>
                        <div className={style.styledInput}>
                            <label htmlFor="weight">Weight</label>
                            <input name="weight" type="number" value={form.weight} onChange={handleInput} />
                            {errors.weight && <span style={{ color: 'red', margin: '10px', fontSize: 'smaller' }}>{errors.weight}</span>}
                        </div>
                        <div className={style.selectType}>
                            <h4>Choose one or two types for your Pokemon</h4>
                            <select onChange={handleSelect}>
                                <option selected disabled>Select type*</option>
                                {
                                    pokemonTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))
                                }
                            </select>

                            <select onChange={handleSelect}>
                                <option selected disabled>Select type</option>
                                {
                                    pokemonTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))
                                }
                            </select>
                            {errors.typeId && <span style={{ color: 'red' }}>{errors.typeId}</span>}
                            {
                                form.typeId && form.typeId.map(type =>
                                (
                                    <div>
                                        <span key={type}>Type {type}</span>
                                        <button onClick={() => handleClick(type)}>x</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button type="submit" disabled={errors.name || errors.image || errors.hp || errors.attack || errors.defense || errors.typeId}>CREATE</button>
                </form>
            </div>
            <div className={style.preview}>
                <h3>Pokemon preview</h3>
                {
                    <Card image={form.image} name={form.name} />
                }
            </div>
        </div>
    </div>
    )
}

export default Form