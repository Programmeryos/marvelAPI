import { useHttp } from "../components/hooks/http.hook";

const  useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f0698f9383f14a8a7ee5e5b997a93ebd';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        
        return res.data.results.map(item => _transformCharacter(item))
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        if (!char.description) {
            char.description = 'Content not founded :p';
        } else if(char.description.length > 150){
            char.description = char.description.slice(0, 150) + '...';
        }

        if(char.name.length > 25) {
            char.name = char.name.slice(0, 25) + '...';
        }

        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    const getTotalCurrent = async () => {
        const res = await request(`${_apiBase}characters?${_apiKey}`);

        return res.data.total;
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(comics => _transformComics(comics));
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            url: comics.urls.url,
            pageCount: comics.pageCount,
            description: comics.description || 'Description not founded'
        }
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

        return res.data.results[0];
    }

    return {getAllCharacters,
            getCharacter, 
            getTotalCurrent, 
            clearError, 
            getAllComics, 
            getComic, 
            getCharacterByName, 
            process,
            setProcess}
}

export default useMarvelService;