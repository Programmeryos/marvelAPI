import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessange from '../errorMessange/errorMessange';

import '../singleComic/singleComic.scss';

const SingleComicsPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);  

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (someComic) => {
        setComic(someComic);
    }

    const errorMessange = error ? <ErrorMessange/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessange}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, thumbnail, price, description, pageCount} = comic;

    return (
        <div className="single-comic">
            <Helmet>
                <meta 
                    charSet="utf-8"
                    name="description"
                    content={`${title} comics book`} />

                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicsPage;