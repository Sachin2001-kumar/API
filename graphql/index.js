import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { authors, games, reviews } from './db.js';
import { typeDefs } from './schema.js';


//server step 

const resolvers={
    Query:{
        games(){
            return games
        },
        authors(){
            return authors
        },
        reviews (){
            return reviews
        },
        review(_,args){
            return reviews.find((review)=>review.id===args.id)
        },
        game(_,args){
            return games.find((game)=>game.id===args.id)
        },
        author(_,args){
            return authors.find((author)=>author.id===args.id)
        }
        

    }
}

const server = new ApolloServer({
   //typeDefs ( type definition)
   //resolvers
   typeDefs:typeDefs,
   resolvers
})

const {url}=await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log(`Server ready port :`, 4000)