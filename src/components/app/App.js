import { useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

import decoration from '../../resources/img/vision.png';

function App() {
    const [charId, setCharId] = useState(null);
    
    const getCharId = (charId) => {
        setCharId(charId);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundaries>
                    <RandomChar/>
                </ErrorBoundaries>
                <div className="char__content">
                    <ErrorBoundaries>
                        <CharList getCharId={getCharId}
                            charId={charId}/>
                    </ErrorBoundaries>
                    <ErrorBoundaries>
                        <CharInfo charId={charId}/>
                    </ErrorBoundaries>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )

}

export default App;