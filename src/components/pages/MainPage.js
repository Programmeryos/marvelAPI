import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

import decoration from '../../resources/img/vision.png';

function MainPage() {
    const [charId, setCharId] = useState(null);
    
    const getCharId = (charId) => {
        setCharId(charId);
    }

    return(
        <>
            <Helmet>
                <meta 
                    charSet="utf-8"
                    name="description"
                    content="All marvel characters" />

                <title>Marvel characters</title>
            </Helmet>
            <ErrorBoundaries>
                <RandomChar/>
            </ErrorBoundaries>
            <div className="char__content">
                <ErrorBoundaries>
                    <CharList getCharId={getCharId}
                        charId={charId}/>
                </ErrorBoundaries>
                <ErrorBoundaries>
                    <div style={{position: 'sticky', top: '30px'}}>
                        <CharInfo charId={charId}/>
                        <ErrorBoundaries>
                            <CharSearchForm/>
                        </ErrorBoundaries>
                    </div>
                </ErrorBoundaries>
            </div>
            <img className="bg-decoration" style={{'zIndex': -1}} src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;