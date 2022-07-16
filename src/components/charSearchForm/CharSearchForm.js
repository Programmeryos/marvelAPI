import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

import './charSearchForm.scss';

function CharSearchForm() {
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [charData, setCharData] = useState();

    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();



    const getCharId = (e) => {
        e.preventDefault();
        clearError();

        
        getCharacterByName(name.split(' ').join('%20'))
            .then(char => {
                setId(char.id);
                setCharData(char)
            })
            .then(() => setProcess('confirmed'))
            .catch(() => {setId(null); console.log("catch")});

    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const state = process === 'loading' ? true : false;

    return(
        <form className="char-search-form" onSubmit={getCharId}>
            <label>
                Or find a character by name:
                <input required placeholder='Enter name' type="text" name='name' value={name} onChange={onChangeName} />
            </label>
            <button className='button button__main' type='submit' disabled={state}>
                <div className="inner">FIND</div>
            </button>
            {id && name ? <Messange name={charData.name} id={id} state={state}/> : null}
            {id === null && name ? <Messange/> : null}
        </form>
    )
}

const Messange = ({name, id, state}) => {
    return(
        <div>
            {name ? (
                <div className='success__wrapper'>
                    <div className='success'>There is! Visit {name} page?</div>
                    <Link to={`/char/${id}`} className='button button__secondary'>
                        <div className="inner">TO PAGE</div>
                    </Link>
                </div>
            ) : (
                <div className='fail'>The character was not found. Check the name and try again</div>
            )}
        </div>
    )
}

export default CharSearchForm;