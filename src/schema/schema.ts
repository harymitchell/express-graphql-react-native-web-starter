const graphql = require('graphql');
import _ from 'lodash';

import {Location} from '../models/Location';
import {Unicorn} from '../models/Unicorn';

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLList
    } = graphql;

// dummy data
// const unicorns = [
//     { name: 'Larry', locationId: '2', id: '1' },
//     { name: 'Mo', locationId: '3', id: '2' },
//     { name: 'Curly', locationId: '1', id: '3' },
//     { name: 'Eddie', locationId: '1', id: '4' },
//     { name: 'Harry', locationId: '1', id: '5' },
// ];

// const = locations = [
//     { name: "Pasture", id: '1' },
//     { name: "Corral", id: '2' },
//     { name: "Barn", id: '3' },
// ];

const UnicornType = new GraphQLObjectType({
    name: 'Unicorn',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { 
            type: LocationType,
            resolve(unicorn, args){
                return _.find(locations, { id: unicorn.locationId });
            } 
        }
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        unicorns: {
            type: new GraphQLList(LocationType),
            resolve(location, args){
                return _.filter(unicorns, { locationId: location.id });
            }
        }
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
        },
        unicorns: {
            type:  new GraphQLList(UnicornType),
            args: { search: { type: GraphQLString } },
            resolve(parent, args){
                if (args.search){
                    return _.filter(unicorns, function(o) { return o.name.match(new RegExp(args.search))});
                } else {
                    return unicorns;
                }
            }
        }
    }});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUnicorn: {
            type: UnicornType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args){
                console.log()
                const unicorn = Unicorn.create({
                    name: args.name
                });
                return unicorn
                // return unicorn.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});