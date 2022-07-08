import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';

import './comicsList.scss';

const ComicsList = () => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(210);
    const [loadingButton, setLoadingButton] = useState(false);
    const [startLoading, setStartLoading] = useState(true);

    const {getAllComics} = useMarvelService();

    const getResurses = async (offset) => {
        await getAllComics(offset)
            .then(newData => {
                setData([...data, ...newData]);
                setLoadingButton(false);
                setStartLoading(false);
            });
    }

    useEffect(() => {
        getResurses(offset);
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        getResurses(offset);
        // eslint-disable-next-line
    }, [offset]);

    const changeOffset = () => {
        setOffset(offset => offset + 9);
        setLoadingButton(true);
    }

    return (
        <div className="comics__list">
            {startLoading ? <Spinner/> : null}
            <ul className="comics__grid">
                {data.map((item, i )=> {
                    let {title, thumbnail, price, id} = item;

                    if (price === 0) {
                        price = 'Not Avalible';
                    } else {
                        price += ' $'
                    }


                    return(
                        <li 
                            key={i}
                            className="comics__item">
                            <Link to={`/comics/${id}`}>
                                <img src={thumbnail} alt={title} className="comics__item-img"/>
                                <div className="comics__item-name">{title}</div>
                                <div className="comics__item-price">{price}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <button className="button button__main button__long"
                 onClick={changeOffset}
                 disabled={loadingButton}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;