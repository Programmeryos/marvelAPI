import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

function CharSearchForm() {
    const [id, setId] = useState();
    const [name, setName] = useState();

    const {getCharacterIdByName, loading, clearError} = useMarvelService()

    const getCharId = (e) => {
        e.preventDefault();
        clearError();

        
        getCharacterIdByName(name.split(' ').join('%20'))
            .then(id => {
                setId(id);
            })
            .catch(() => {setId(null); console.log("catch")});

    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return(
        <form className="char-search-form" onSubmit={getCharId}>
            <label>
                Or find a character by name:
                <input required placeholder='Enter name' type="text" name='name' value={name} onChange={onChangeName} />
            </label>
            <button className='button button__main' type='submit' disabled={loading}>
                <div className="inner">FIND</div>
            </button>
            {id && name ? <Messange name={name} id={id} loading={loading}/> : null}
            {id === null && name ? <Messange/> : null}
        </form>
    )
}

const Messange = ({name, id, loading}) => {
    return(
        <div>
            {name ? (
                <div className='success__wrapper'>
                    <div className='success'>There is! Visit {name} page?</div>
                    <Link to={`/char/${id}`} className='button button__secondary' disabled={loading}>
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