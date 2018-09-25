import { gql } from 'apollo-boost';

const addUnicornMutation = gql`
            mutation AddUnicorn($name: String!){
               addUnicorn(name: $name){
                 id
                 name
               }
             }
        `;
        
const getUnicornsQuery = gql`
    { 
        unicorns (search:""){ 
            name 
            location{ 
                name 
            }
        }
    }
`;
        
export { addUnicornMutation, getUnicornsQuery };
