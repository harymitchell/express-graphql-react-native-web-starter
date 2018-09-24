const graphql = require('graphql');

import _ from 'lodash';

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID
    } = graphql;

// dummy data
const unicorns = [
    { name: 'Larry', locationId: '2', id: '1' },
    { name: 'Mo', locationId: '3', id: '2' },
    { name: 'Curly', locationId: '1', id: '3' },
];

const = locations = [
    { name: "Pasture", id: '1' },
    { name: "Corral", id: '2' },
    { name: "Barn", id: '3' },
];

const UnicornType = new GraphQLObjectType({
    name: 'Unicorn',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { 
            type: LocationType,
            resolve(unicorn, args){
                console.log(unicorn);
                return _.find(locations, { id: unicorn.locationId });
            } 
        }
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        unicorn: {
            type: UnicornType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(unicorns, { id: args.id });
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(locations, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery 
});