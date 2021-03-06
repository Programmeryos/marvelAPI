import { useState, useEffect } from 'react';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import CharSearchForm from '../charSearchForm/CharSearchForm';

import setContent from '../../utils/setContent';

function CharInfo(props){
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        getResurses();
    }, [props.charId])

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.charId !== prevProps.charId) {
    //         this.getResurses();
    //     }
    // }
    useEffect(() => {
        setProcess('waiting')
    }, []);

    const getResurses = () => {
        clearError();
        const {charId} = props
        if(!charId){
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
            .then(()=> {setProcess('confirmed')})
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // const skeleton = char || loading || error ? null : <Skeleton/>;
    // const spinner = loading ? <Spinner/> : null;
    // const errorMessange = error ? <ErrorMessange/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className='char__info__wrapper'>
            <div className="char__info">
                {/* {skeleton}
                {content}
                {errorMessange}
                {spinner} */}
                {setContent(process, View, char)}
            </div>
        </div>
    )

}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let imgStyle = {objectFit: 'cover'};

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {objectFit: 'contain'};
            }


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 &&
                    'Comics not founded'
                }

                {
                    comics.map((item, i) => {
                        if (i > 7) {
                            return;
                        }

                        return (
                            <li className="char__comics-item"
                                key={i}>
                                {item.name}
                            </li>
                        ) 
                    })
                }
                
            </ul>
        </>
    )
}

export default CharInfo;