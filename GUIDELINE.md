This file explicitly contains the guidelines for a new user to understand the basic things about this project.

Directory Structure
project/
	bin/
		www
	config/
		configStructure.json
	lib/
		api/
			Admin/
				Admin.js
			Events/
				Event.js
				Events.js
			User/
				User.js
			User2/
				Team/
					index.js
					invite.js
				Teams/
					getTeams.js
					index.js
					teamCrud.js
					userTeams.js
			middleware/
				tokenSecurity.js
		database/
			db.js
			dummyEntries.sql
			schema.sql
		services/
			tokenService.js
		Response.js
		statusCodes.js
	middlewares/
		adminMiddleware.js
		authenticateGmailToken.js
	models/
		category.js
		coordinator.js
		eventRegister.js
		events.js
		index.js
		interests.js
		studentDetails.js
		students.js
		teamInvites.js
		teams.js
	routes/
		index.js
	.gitignore
	.travis.yml
	README.md
	app.js
	package.json

"camelCase" convention has been used throughout the project.

Changes that will occur later on
1) User and User2 directories will be merged into one.
2) getTeams.js will be changed as getRegisteredTeams.js once merging is done.

Instructions to be followed to execute the project on local machine
1) Create a config.js in the config directory following the same structure as in configStructure.js
2) Create a database named as 'techspardha2017'.
3) Make sure you insert the dummyEntries.sql into the techspardha2017.
4) Currently there is no data related to Events table in the dummyEntries.sql file but the tables are so strongly connected, so make sure you enter some dummy data into the Events table to run the project smoothly.

Have fun !!!