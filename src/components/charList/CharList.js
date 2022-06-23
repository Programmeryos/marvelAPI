import { useState, useEffect } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessange from '../errorMessange/errorMessange';

function CharList(props) {
    const [data, setData] = useState([]),
        [error, setError] = useState(false),
        [loading, setLoading] = useState(true),
        [offset, setOffset] = useState(210),
        [ended, setEnded] = useState(false),
        [loadingButton, setLoadingButton] = useState(false),
        [total, setTotal] = useState(999999);

    const marvelService = new MarvelService();

    const getTotalCurr = () => {
        marvelService
            .getTotalCurr()
            .then(total => {
                setTotal(total)
            })
    }

    const getResurses = (offset) => {
        getTotalCurr()

        marvelService
            .getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onError)
    }

    useEffect(() => {
        getResurses(offset);
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        getResurses(offset);
        // eslint-disable-next-line
    }, [offset]);

    const onCharLoaded = (newData) => {

        setData([...data, ...newData]);
        setLoading(false);
        setLoadingButton(false);

        if (offset >= (total - 9)) {
            setEnded(true)
        }

    }

    const onError = () => {
        setLoading(false);
        setError(true);
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

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
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