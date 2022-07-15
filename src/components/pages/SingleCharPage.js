import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/spinner";
import errorMessange from "../errorMessange/errorMessange";

import '../singleComic/singleComic.scss';

function SingleCharPage() {
    const {charId} = useParams();
    const [char, setChar] = useState();

    const {getCharacter, loading, clearError, error} = useMarvelService();

    useEffect(() => {
        updateChar(charId);
        console.log(char)
    }, [charId])

    const updateChar = (charId) => {
        clearError();
        getCharacter(charId)
            .then(char => setChar(char))
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessange = error ? <errorMessange/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="single-comic">
            {errorMessange}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char:{thumbnail, name, description}}) => {
    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleCharPage;