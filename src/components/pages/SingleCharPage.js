import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import useMarvelService from "../../services/MarvelService";

import AppBanner from "../appBanner/AppBanner";

import setContent from "../../utils/setContent";
import '../singleComic/singleComic.scss';

function SingleCharPage() {
    const {charId} = useParams();
    const [char, setChar] = useState();

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar(charId);
    }, [charId])

    const updateChar = (charId) => {
        clearError();
        getCharacter(charId)
            .then(char => setChar(char))
            .then(() => setProcess('confirmed'))
    }


    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                {setContent(process, View, char)}
            </div>
        </>
    )
}

const View = ({data:{thumbnail, name, description}}) => {
    return (
        <>
            <Helmet>
                <meta 
                    charSet="utf-8"
                    name="description"
                    content={`${name} hero page`} />

                <title>{name}</title>
            </Helmet>
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