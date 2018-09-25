const graphql = require('graphql');
import _ from 'lodash';
import {Sequelize} from 'sequelize-typescript';

import {Location} from '../models/Location';
import {Unicorn} from '../models/Unicorn';

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLList,
        GraphQLNonNull
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
                return Location.findById(unicorn.locationId);
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
            type: new GraphQLList(UnicornType),
            resolve(location, args){
                return Unicorn.findAll({
                  where: {
                    locationId: location.id
                  }
                });
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
                return Unicorn.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Location.findById(args.id);
            }
        },
        locations: {
            type:  new GraphQLList(LocationType),
            args: { search: { type: GraphQLString } },
            resolve(parent, args){
                return Location.findAll(args.search ? {
                  where: {
                    name: {
                        [Sequelize.Op.like]: args.search
                    }
                  }
                }: {});
            }
        },
        unicorns: {
            type:  new GraphQLList(UnicornType),
            args: { search: { type: GraphQLString } },
            resolve(parent, args){
                return Unicorn.findAll(args.search ? {
                  where: {
                    name: {
                        [Sequelize.Op.like]: args.search
                    }
                  }
                }: {});
            }
        }
    }});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUnicorn: {
            type: UnicornType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                return Unicorn.create({
                    name: args.name
                });
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                return Location.create({
                    name: args.name
                });
            }
        },
        moveUnicorn: {
            type: UnicornType,
            args: {
                unicornId: { type: new GraphQLNonNull(GraphQLID) }
                toLocationId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                return Unicorn.update({
                    locationId: args.toLocationId
                }, {
                    where: {id: args.unicornId}
                    returning: true,
                    plain: true
                })
                .then(res => {
                    return Unicorn.findById(args.unicornId);
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});