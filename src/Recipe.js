import React from 'react';
import style from './Recipe.Module.css';

const Recipe = ({title,calories,image,ingredients}) => {
    return (
        <div >
            <h1 >{title}</h1>
            <ol>
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>{calories}</p>
            <img className={style.image} src={image} alt=""/>
        </div>
    );
};

export default Recipe;