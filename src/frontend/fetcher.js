
const handleError = (err) => console.log(err);
const handleJson = (data) => data.json();


const baseFetcher = (url, options) =>
    fetch('/api' + url, options)
        .then(handleJson)
        .catch(handleError);


export const get = (url) => baseFetcher(url);


export const postJson = (url, object) => baseFetcher(url, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});
