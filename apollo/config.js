    
import cache from './cache'

export default function(ctx) {
    return {
        httpEndpoint: 'https://kanuki-gql.herokuapp.com/graphql',
        cache
  }
}