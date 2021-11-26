import CONFIG from '../configuracion/config.json';

export const consumir = async () =>{
    const path = new URL(CONFIG.COMMENTS_API.URL);
    const results = await fetch(path);
    return await results.json();
};