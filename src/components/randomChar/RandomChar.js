import { useState, useEffect } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessange from '../errorMessange/errorMessange';

function RandomChar (){

    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    const getResurses = () => {
        clearError();
        
        const id = Math.floor(Math.random() * (1011205 - 1011005) + 1011005);
            getCharacter(id)
            .then(char => {
                setChar(char);
            })
    }

    useEffect(() => {
        getResurses();
        // eslint-disable-next-line
    } ,[]);



    const errorMessange = error ? <ErrorMessange/> :null;
    const spinner = loading ? <Spinner/> : null;
    const content = (!loading && !error) ? <View charData={char}/> : null;


    return (
        
        <div className="randomchar">
            {errorMessange}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={() => getResurses()}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

function View(props) {
    const {thumbnail, name, description, homepage, wiki} = props.charData;

    let imgStyle = {objectFit: 'cover'};

    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = {objectFit: 'contain'};
    }

    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;