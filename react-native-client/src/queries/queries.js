import { gql } from 'apollo-boost';

const addUnicornMutation = gql`
            mutation AddUnicorn($name: String!){
               addUnicorn(name: $name){
                 id
                 name
               }
             }
        `;

const updateUnicornMutation = gql`
             mutation MoveUnicorn($unicornId: ID!, $toLocationId: ID!){
               moveUnicorn(unicornId:$unicornId, toLocationId:$toLocationId){
                 id
                 name
                 location{
                   id
                   name
                 }
               }
             }
        `;
        
const getUnicornsQuery = gql`
    { 
        unicorns (search:""){ 
            id
            name 
            location{ 
                id
                name 
            }
        }
    }
`;
        
export { addUnicornMutation, getUnicornsQuery, updateUnicornMutation };
