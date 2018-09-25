# Unicorn Farm:  ode.js 
Built with:
1) node.js + express 
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
	
# Sequelize

- Sqlite3 DB engine
- models found in *src/models*
	- Location
	- Unicorn

