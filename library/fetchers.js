import fetch from 'unfetch'
import { request } from 'graphql-request'
const API = 'https://api.graph.cool/simple/v1/movies'

const GraphQLFetcher = query => request(API, query)

const JSONFetcher = url => fetch(url).then(r => r.json())

export { JSONFetcher, GraphQLFetcher }