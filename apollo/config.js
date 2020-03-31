    
import cache from './cache'

export default function(ctx) {
    return {
        // httpEndpoint: 'https://kanuki-gql.herokuapp.com/graphql',
        // httpEndpoint: 'http://localhost:5000/graphql',
        httpEndpoint: 'http://localhost:5000/graphql',
        cache
  }
}