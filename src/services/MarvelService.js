class  MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f0698f9383f14a8a7ee5e5b997a93ebd';
    _baseOffset = 210;

    getResurses = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error (`Не фетчится: ${url}, статус: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResurses(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        
        return res.data.results.map(item => this._transformCharacter(item))
    }

    getCharacter = async (id) => {
        const res = await this.getResurses(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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

    getTotalCurr = async () => {
        const res = await this.getResurses(`${this._apiBase}characters?${this._apiKey}`);

        return res.data.total;
    }
}

export default MarvelService;