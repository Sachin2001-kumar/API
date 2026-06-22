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
    },
    Game:{
        reviews(parent){
         return reviews.filter((r)=>r.game_id===parent.id)
        }
    },
    Author:{
        reviews(parent){
         return reviews.filter((r)=>r.author_id===parent.id)
        }
    },
    Review:{
        author(parent){
            return authors.find((a)=>a.id===parent.id)
        },
        game(parent){
            return games.find((g)=>g.id===parent.id)
        },
    },
    //Mutation
    Mutation:{
        deleteGame(_,args){
            games=games.filter((a)=>a.id!==args.id)

            return games
        },
        addGame(_,args){
            let game={
                ...args.game,
                id:Math.floor(Math.random()*1000).toString()
            }

            games.push(game)
            return games
        },
        updateGame(_,args){
            games=games.map((g)=>{
                if(g.id===args.id){
                    return{...g,...args.edits}
                }
                return g
            })

            return games.find((g)=>g.id===args.id)
            
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