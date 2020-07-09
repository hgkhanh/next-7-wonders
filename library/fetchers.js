import fetch from 'unfetch'

const JSONFetcher = url => fetch(url).then(r => r.json())

export { JSONFetcher }