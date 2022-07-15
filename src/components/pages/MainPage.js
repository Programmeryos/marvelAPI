import { useState } from "react";

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
            <ErrorBoundaries>
                <RandomChar/>
            </ErrorBoundaries>
            <div className="char__content">
                <ErrorBoundaries>
                    <CharList getCharId={getCharId}
                        charId={charId}/>
                </ErrorBoundaries>
                <ErrorBoundaries>
                    <div>
                        <CharInfo charId={charId}/>
                        <ErrorBoundaries>
                            <CharSearchForm/>
                        </ErrorBoundaries>
                    </div>
                </ErrorBoundaries>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;