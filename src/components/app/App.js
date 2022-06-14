import { Component } from "react/cjs/react.production.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        charId: null
    }
    
    getCharId = (charId) => {
        this.setState({charId})
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundaries>
                        <RandomChar/>
                    </ErrorBoundaries>
                    <div className="char__content">
                        <ErrorBoundaries>
                            <CharList getCharId={this.getCharId}
                                charId={this.state.charId}/>
                        </ErrorBoundaries>
                        <ErrorBoundaries>
                            <CharInfo charId={this.state.charId}/>
                        </ErrorBoundaries>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;