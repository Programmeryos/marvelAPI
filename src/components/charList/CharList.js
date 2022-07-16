import { useState, useEffect } from 'react';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessange from '../errorMessange/errorMessange';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case  'confirmed':
            return <Component/>
            break;
        case 'error': 
            return <errorMessange/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}


function CharList(props) {
    const [data, setData] = useState([]),
        [newItemLoading, setnewItemLoading] = useState(true),
        [offset, setOffset] = useState(210),
        [ended, setEnded] = useState(false),
        [loadingButton, setLoadingButton] = useState(false),
        [total, setTotal] = useState(999999);

    const {getAllCharacters, getTotalCurrent, clearError, process, setProcess} = useMarvelService();

    const getTotalCurr = () => {
        getTotalCurrent()
            .then(total => {
                setTotal(total)
            })
    }

    const getResurses = (offset, initial) => {
        clearError();
        initial ? setnewItemLoading(false) : setnewItemLoading(true);

        getAllCharacters(offset)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    useEffect(() => {
        getResurses(offset, true);
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


    const renderItems = (arr) => {
        const elements = arr.map(item => { 
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
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    return (
        <div className="char__list">
            {setContent(process, () => renderItems(data), newItemLoading)}
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