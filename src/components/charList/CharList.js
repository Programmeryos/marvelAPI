import { useState, useEffect } from 'react';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessange from '../errorMessange/errorMessange';

function CharList(props) {
    const [data, setData] = useState([]),
        [offset, setOffset] = useState(210),
        [ended, setEnded] = useState(false),
        [loadingButton, setLoadingButton] = useState(false),
        [total, setTotal] = useState(999999);

    const {loading, error, getAllCharacters, getTotalCurrent, clearError} = useMarvelService();

    const getTotalCurr = () => {
        getTotalCurrent()
            .then(total => {
                setTotal(total)
            })
    }

    const getResurses = (offset) => {
        clearError();

        getAllCharacters(offset)
            .then(onCharLoaded)
    }

    useEffect(() => {
        getResurses(offset);
        getTotalCurr();
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        getResurses(offset);
        // eslint-disable-next-line
    }, [offset]);

    const onCharLoaded = (newData) => {

        setData([...data, ...newData]);
        setLoadingButton(false);

        if (offset >= (total - 9)) {
            setEnded(true)
        }

    }


    const onChangeOffset = (offset) => {
        setOffset(offset + 9);
        setLoadingButton(true);
    }
        

        const spinner = loading ? <Spinner/> : null;
        const errorMessange = error ? <ErrorMessange/> : null;

        const elements = data.map(item => { 
            const {id, name, thumbnail} = item;

            let imgStyle = {objectFit: 'cover'};

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif") {
                imgStyle = {objectFit: 'contain'};
            }

            let clazz = 'char__item';

            if(props.charId === id) {
                clazz += ' char__item_selected';
            } else {
                clazz = 'char__item';
            }

            return(
                <li className={clazz}
                    key={id}
                    onClick={() => props.getCharId(id)}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <div className="char__list">
                {errorMessange}
                {spinner}
                <ul className="char__grid">
                    {elements}
                </ul>
                {!ended && 
                    <button className="button button__main button__long"
                        onClick={() => onChangeOffset(offset)}
                        disabled={loadingButton}>
                        <div className="inner">load more</div>
                    </button>
                }
            </div>
        )
}

export default CharList;