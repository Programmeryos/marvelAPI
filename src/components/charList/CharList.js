import { Component } from 'react/cjs/react.production.min';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessange from '../errorMessange/errorMessange';

class CharList extends Component {
    state = {
        data: [],
        error: false,
        loading: true,
        offset: 210,
        ended: false,
        loadingButton: false,
        total: 999999,
    }

    marvelService = new MarvelService();

    getTotalCurr = () => {
        this.marvelService
            .getTotalCurr()
            .then(total => {
                this.setState({total})
            })
    }

    getResurses = (offset) => {
        this.getTotalCurr()

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount () {
        
        this.getResurses(this.state.offset);
       
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.offset !== prevState.offset) {
            this.getResurses(this.state.offset);
        }

    }

    onCharLoaded = (data) => {
        this.setState({
            data: [...this.state.data, ...data],
            loading: false,
            loadingButton: false,
        })

        if (this.state.offset >= this.state.total - 9) {
            this.setState({ended: true})
        }

    }

    onError = () => {
        this.setState({
            loading:false,
            error: true
        })
    }

    onChangeOffset = (offset) => {
        this.setState({
            offset: offset + 9,
            loadingButton: true
        })

    }

    render() {
        
        const {data, loading, error} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessange = error ? <ErrorMessange/> : null;

        const elements = data.map(item => { 
            const {id, name, thumbnail} = item;

            let imgStyle = {objectFit: 'cover'};

            if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {objectFit: 'contain'};
            }

            let clazz = 'char__item';

            if(this.props.charId === id) {
                clazz += ' char__item_selected';
            } else {
                clazz = 'char__item';
            }

            return(
                <li className={clazz}
                    key={id}
                    onClick={() => this.props.getCharId(id)}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <div className="char__list">
                {errorMessange}
                {spinner}
                <ul className="char__grid">
                    {elements}
                </ul>
                {!this.state.ended && 
                    <button className="button button__main button__long"
                        onClick={() => this.onChangeOffset(this.state.offset)}
                        disabled={this.state.loadingButton}>
                        <div className="inner">load more</div>
                    </button>
                }
            </div>
        )
    }
}

export default CharList;