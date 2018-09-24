/* 
	I need a unicorn manager to keep track of my unicorns, so I'd like a flexible, easily used back-end system set up.
	I have a pasture, a barn, and a corral, and unicorns may be kept in any of these locations. I need the ability to add a new unicorn. I need to be able to move unicorns from one place to another. I need to be able to see where all of my unicorns are.
	This needs to be a fully-functional back end.
	Please submit your code in a Github repo that I can access. 
*/
	
MODULE UnicornManager	
	addUnicorn(name)
		new Unicorn(name).save()...
		
	moveUnicorn(unicorn, toLocation)
		updateUnicorn(name)
		
	unicornSummary(): [{unicorn, location}]
	
CLASS Location
	name: STRING   (example Pasture, Barn, Corral)
	date_created: DATETIME

CLASS Unicorn
	name: STRING
	date_created: DATETIME
	
CLASS UnicornLocationActivity
	// providing current and historical view
	unicorn: UNICORN
	location: LOCATION
	isCurrent: BOOLEAN
	date_created: DATETIME
	
	
	
	