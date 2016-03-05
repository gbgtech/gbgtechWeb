
const handleError = (result) => {
    if (result.ok) {
        return result;
    } else {
        throw result;
    }
};

const handleJson = (data) => data.json();


const baseFetcher = (url, options) =>
    fetch('/api' + url, options)
        .then(handleError)
        .then(handleJson);


export const get = (url) => baseFetcher(url);


export const postJson = (url, object) => baseFetcher(url, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});

export const putJson = (url, object) => baseFetcher(url, {
    method: 'PUT',
    body: JSON.stringify(object),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})
