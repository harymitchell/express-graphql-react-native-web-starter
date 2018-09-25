# Unicorn Farm
Built with:
1) node.js + express + typescript
2) GraphQL https://graphql.org
3) Sequelize Typescript https://github.com/RobinBuschmann/sequelize-typescript
4) ReactNative Web

# Business Requirements
Tracking of unicorns. A flexible and easy to use back-end system set up. We have a pasture, a barn, and a corral, and unicorns may be kept in any of these locations. Must support these operations: add a new unicorn, move unicorns, see where all of my unicorns are.

# Node Express Typescript

- *src/server.ts* is the Express app
- uses a single route for graphql queries: */graphql*

# GraphQL

- schemas defined in *src/schema/schema.ts*
- Defines a LocationType and a UnicornType
- Root Queries
	- unicorn(id)
	- location(id)
	- unicorns(search)
	- locations(search)
- Mutations
	- addUnicorn(name)
	- addLocation(name)
	- moveUnicorn(unicornId, toLocationId)
	
## Test Queries

- mutation { addUnicorn(name:"Larry"){ id name } } 
- mutation { addLocation(name:"Barn"){ id name } }
- mutation { moveUnicorn(unicornId:2, toLocationId:3)
- { id name location{ id name } } }
- { location(id:2){ name id } }
- { locations{ name id unicorns{ name id } } }
- { unicorn(id:2){ name id } }
- { unicorns (search:""){ name id location{ name } } }
	
# Sequelize Typescript

- Sqlite3 DB engine
- models found in *src/models*
	- Location
	- Unicorn

# React Native Web

- bootstrapped with *create-react-native-app*
- *react-native-client/* directory
- Uses Apollo https://www.apollographql.com
- Components
	- UnicornList: displays unicorns and locations
	- AddUnicorn: modal for adding a new unicorn
	- UpdateUnicorn: modal for moving unicorns locations
	
# Development and Deployment

- Live web-app located at https://unicorn-manager-harymitchell.c9users.io:8081
- GraphQL server located at https://unicorn-manager-harymitchell.c9users.io:8080/graphql
