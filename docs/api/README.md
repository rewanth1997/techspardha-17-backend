[Coordinators](#coordinators)

- [Login](#login)
- [Get list of events under coordination](#get-list-of-events-under-coordination)
- [Move participants to next level](#move-participants-to-next-level)

[Users](#user)
- [Login / Signup](#login--signup)
- [Get user details](#get-user-info)
- [Update user details](#update-user-info)
- [Get interests](#get-user-interests)
- [Add user interests](#add-user-interests)
- [Remove category from user interests](#remove-category-from-user-interests)

[Events](#events)
- [Create new Event](#create-new-event-coordinator-token-required)
- [List all Events](#list-all-events)
- [Get event details](#get-event-details)
- [Delete event](#delete-an-event-coordinator-token-required)
- [Search Events](#search-events)
- [Register for event](#register-for-event)
- [Get participants](#get-event-participants)

[General](#general)
- [List all categories](#list-all-categories)
- [List all societies](#list-all-societies)

[Teams](#teams)
- [Create team](#create-team)
- [Team invite](#team-invite)
- [Delete team](#delete-team)
- [Get all teams registered for event](#get-all-teams-registered-for-event)
- [Get list of teams by a user(My teams)](#get-my-teams)

# Coordinators

### Login

`POST /admin/login HTTP/1.1`

Fields:

| Name     	| Description           	| Type   	| Required 	|
|----------	|-----------------------	|--------	|----------	|
| username 	| Username of Coordinator 	| string 	| true     	|
| password 	| Password of Coordinator	| string 	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": {
    "token": "ACCESS_TOKEN_FOR_FURTHER_USE"
  }
}
```


### Get list of events under coordination

`GET /admin/events?token=TOKEN HTTP/1.1`

| Name  	| Description                            	| Type   	| Required 	|
|-------	|----------------------------------------	|--------	|----------	|
| token 	| Token obtained by calling `/admin/login` 	| string 	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [5,6]
}
```

### Move participants to next level

`POST /event/:eventId/forward HTTP/1.1`

| Name  	| Description                            	| Type   	| Required 	|
|-------	|----------------------------------------	|--------	|----------	|
| token 	| Token obtained by calling `/admin/login` 	| string 	| true     	|
| eventId  	| Id of the event                               | array		| true 		|
| data  	| Array of participant IDs (Team of Individual) | array		| true 		|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": null
}
```


*******************
# User

### Login / Signup:

`POST /user/login HTTP/1.1`

Fields:

| Name       	| Description                                         	| Type   	| Required 	|
|------------	|-----------------------------------------------------	|--------	|----------	|
| accessToken 	| Access Token obtained from google login        	| string 	| false     	|
| idToken 	| ID token obtained from google login           	| string 	| false     	|

Either one of two parameters is required for login

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": {
    "isNew": true,
    "token": "ACCESS_TOKEN_FOR_FURTHER_USE"
  }
}
```

isNew is true if personal details of the user are not yet acquired (New User).



### Get user info:

`GET /user/me?token=TOKEN HTTP/1.1`

Fields:

| Name       	| Description                                         	| Type   	| Required 	|
|------------	|-----------------------------------------------------	|--------	|----------	|
| token 	| Access Token of ID token obtained from login api 	| string 	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": {
    "RollNo": 1140333,
    "PhoneNumber": "9050563712",
    "Branch": "CS",
    "Year": "3",
    "College": "NIT",
    "Gender": "male",
    "Id": 1,
    "Profile": {
      "Name": "Anshul Malik",
      "Email": "malikanshul29@gmail.com"
    }
  }
}
```

### Update user info:

`POST /user/me?token=TOKEN HTTP/1.1`

Fields:

| Name        	| Description                    	| Type    	| Required 	|
|-------------	|--------------------------------	|---------	|----------	|
| name        	| Name of the user               	| string  	| false    	|
| rollNo      	| Roll number of user            	| integer 	| false    	|
| phoneNumber 	| Phone number of user           	| string  	| false    	|
| branch      	| Major/Branch of user           	| string  	| false    	|
| college     	| College name of user           	| string  	| false    	|
| year        	| Current year of user           	| string  	| false    	|
| token       	| App token obtained after login 	| string  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": null
}
```

### Get user interests:

`GET /user/interests?token=TOKEN HTTP/1.1`

Fields:

| Name        	| Description                    	| Type    	| Required 	|
|-------------	|--------------------------------	|---------	|----------	|
| token       	| App token obtained after login 	| string  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [1, 2]
}
```

### Add user interests:

`POST /user/interests HTTP/1.1`

Fields:

| Name      	| Description                                   	| Type   	| Required 	|
|-----------	|-----------------------------------------------	|--------	|----------	|
| token     	| App token obtained after login                	| string 	| true     	|
| interests 	| List of category IDs to be added as interests 	| array  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": null
}
```

### Remove category from user interests:

`DELETE /user/interests HTTP/1.1`

Fields:

| Name      	| Description                                   	| Type   	| Required 	|
|-----------	|-----------------------------------------------	|--------	|----------	|
| token     	| App token obtained after login                	| string 	| true     	|
| interests 	| List of category IDs to be deleted from interests 	| array  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": null
}
```

*******************
# Events

### Create new Event (Coordinator Token Required)

`POST /events HTTP/1.1` (Create)

`POST /event/:eventId HTTP/1.1` (Update)

Fields:

| Name  	| Description                            	| Type   	| Required 	|
|-------	|----------------------------------------	|--------	|----------	|
| token 	| Token obtained by calling `/admin/login` 	| string 	| true     	|
| name  	| Name of the event                     	| string 	| true     	|
| description 	| Description about the event            	| string 	| false     	|
| start 	| Start Datetime of the event                 	| string  	| true     	|
| end    	| End Datetime of the event                 	| string 	| true     	|
| categoryId 	| Category ID of the event                 	| integer 	| true     	|
| societyId 	| Society ID of the event                 	| integer 	| true     	|

Datetime is standard javascript new Date() object's string representation.
e.g. Tue Nov 15 2016 00:44:20 GMT+0530 (IST)

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": "Event added successfully"
}
```


### List all Events:

`GET /events HTTP/1.1`

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [
    {
      "Id": 5,
      "Name": "Excaliubur",
      "SocietyId": 1,
      "CategoryId": 1
    }
  ]
}
```


### Get event details:

`GET /event/:eventId HTTP/1.1`

Fields:

| Name        	| Description                    	| Type    	| Required 	|
|-------------	|--------------------------------	|---------	|----------	|
| eventId     	| ID of event                   	| integer  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": {
    "Id": 6,
    "Name": "Excal",
    "Description": "This is an event",
    "Venue": null,
    "Start": "2016-11-14T19:14:20.000Z",
    "End": "2016-11-14T19:14:20.000Z",
    "CurrentRound": "0",
    "MaxContestants": 1,
    "Status": "Not started",
    "Pdf": "http://web-resource.com/pdf.pdf",
    "CategoryId": 1,
    "SocietyId": 1
  }
}
```

### Delete an Event (Coordinator Token Required)

`DELETE /event/:eventId HTTP/1.1`

| Name  	| Description                            	| Type   	| Required 	|
|-------	|----------------------------------------	|--------	|----------	|
| token 	| Token obtained by calling `/admin/login` 	| string 	| true     	|
| eventId  	| ID of event to be deleted                   	| integer 	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": "Successfully deleted"
}
```


### Search Events:

`GET /events?query=SEARCH_TERM HTTP/1.1`

Fields:

| Name        	| Description                    	| Type    	| Required 	|
|-------------	|--------------------------------	|---------	|----------	|
| query     	| Search query                   	| string  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [
    {
      "Id": 5,
      "Name": "Excaliubur",
      "Description": "This is an event",
      "Venue": null,
      "Start": "2016-11-14T19:14:20.000Z",
      "End": "2016-11-14T19:14:20.000Z",
      "CurrentRound": "0",
      "MaxContestants": 1,
      "Status": "Not started",
      "Pdf": null,
      "CategoryId": 1,
      "SocietyId": 1
    }
  ]
}
```

### Register for event:

`POST /event/:eventId/register HTTP/1.1`

Fields:

| Name        	| Description                    	| Type    	| Required 	|
|-------------	|--------------------------------	|---------	|----------	|
| token    	| App token obtained after login       	| string  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": null
}
```

### Get event participants:

`GET /event/:eventId/participants?token=TOKEN HTTP/1.1`

Fields:

| Name        	| Description                           	| Type    	| Required 	|
|-------------	|--------------------------------       	|---------	|----------	|
| token     	| Token obtained by calling `/admin/login`     	| integer  	| true     	|

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [1, 2]
}
```


*******************
# General

### List all categories:

`GET /categories HTTP/1.1`

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [
    {
      "Id": 1,
      "Name": "Managerial",
      "Description": null
    },
    {
      "Id": 2,
      "Name": "Technical",
      "Description": "Technical events goes here"
    }
  ]
}
```

### List all societies:

`GET /user/societies HTTP/1.1`

Response:
```
{
  "status": {
    "code": 200,
    "message": "SUCCESS"
  },
  "data": [
    {
      "Id": 1,
      "Name": "Technobyte",
      "Description": "Technical society of NIT Kurukshetra"
    }
  ]
}
```

*********************

# Teams

### Create team:


### Team invite:


### Delete team:


### Get all teams registered for event


### Get my teams
