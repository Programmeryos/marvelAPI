import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';


import './charSearchForm.scss';

function CharSearchForm() {
    const [id, setId] = useState();
    const [name, setName] = useState();


    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();



    const getCharId = (e) => {
        e.preventDefault();
        clearError();

        const form = document.forms.heroSearch;

        let heroName = form.name.value;

        setName(heroName);
        getCharacterByName(heroName.split(' ').join('%20'))
            .then(char => {
                setId(char.id);
            })
            .then(() => setProcess('confirmed'))
            .catch(() => setProcess('error'))
    }


    const state = process === 'loading' ? true : false;

    return(
        <form name="heroSearch" className="char-search-form" onSubmit={getCharId}>
            <label>
                Or find a character by name:
                <input required placeholder='Enter name' type="text" name='name'  />
            </label>
            <button className='button button__main' type='submit' disabled={state}>
                <div className="inner">FIND</div>
            </button>
            <Messange name={name} id={id} process={process}/>
        </form>
    )
}

const Messange = ({name, id, process}) => {
   
    return(
        <div>
            {process === 'confirmed' && (
                <div className='success__wrapper'>
                    <div className='success'>There is! Visit {name} page?</div>
                    <Link to={`/char/${id}`} className='button button__secondary'>
                        <div className="inner">TO PAGE</div>
                    </Link>
                </div>
            ) }
            {process === 'error' && (
                <div className='fail'>The character was not found. Check the name and try again</div>
            )}
        </div>
    )
}

export default CharSearchForm;