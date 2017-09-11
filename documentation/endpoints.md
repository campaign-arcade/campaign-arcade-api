# API Documentation #

URI:  https://campaign-arcade-api.herokuapp.com/

expected header info:
- Content-Type: application/x-www-form-urlencoded
- Authorization: Basic (HASH)

All endpoints require authentication of a user account that is already in the database.  

## CREATE ##

### POST /newuser ###
create a new user account
input:
- username: string, required
- password: string, required (gets hashed automatically before being saved)
- admin: boolean, not required, default is false
returns new user (json)

UPDATE:  this may need to be changed to create a new user initially without authentication, currently it requires auth.

### POST /newcampaign ###
create a new campaign
input:
- adminId: string, required
returns new campaign (json)

### POST /newcall ###
create a new call
input:
- userId: string, required
- campaignId: string, required
returns new call (json)

### POST /newinvite ###
create a new invitation
input:
- inviteCode: string, required
- campaignId: string, required
- inviterId: string, required
returns new invite (json)

## READ ##

### GET /user/:id ###
read all user info
input:
- userId is required in the path (:id)
returns the found user (json), password will be hashed

### GET /campaign/:id ###
read all campaign info
input:
- campaignId is required in the path (:id)
returns the found campaign (json)

### GET /campaign/:id/users ###
read all users of a campaign
input:
- campaignId is required in the path (:id)
returns the found campaign's users (json { users: [array] })

### GET /invite/:code ###
read an invite from the given inviteCode
input:
- inviteCode is required in the path (:code)
returns the invite (json)

### POST /invite/:code/accept ###
accept an invitation
input:
- inviteCode is required in the path (:code)
- userId: string, required
if successful, userId will be added to the users array in the campaign
returns (json { success: true || false })

### GET /calls/user/:id ###
read calls for a user
input:
- userId is required in the path (:id)
returns array of calls (json)

### GET /calls/campaign/:id ###
read calls for a campaign
input:
- campaignId is required in the path (:id)
returns array of calls (json)

## UPDATE ##

### PUT /user/:id ###
update a user account by id
input:
- userId is required in the path (:id)
- any changed parameter is required by name in the body
returns the updated user (json)

### PUT /campaign/:id ###
update a campaign by id
input:
- campaignId is required in the path (:id)
- any changed parameter is required by name in the body
returns the updated campaign (json)

### PUT /call/:id ###
update a call by id
input:
- call Id is required in the path (:id)
- any changed parameter is required by name in the body
returns the updated call (json)

### PUT /invite/:id ###
update an invite by id
input:
- invite Id is required in the path (:id)
- any changed parameter is required by name in the body
returns the updated invite (json)

## DESTROY ##

### DELETE /user/:id ###
delete a user
- userId is required in the path (:id)
returns a success message and the deleted user (json)

### DELETE /campaign/:id ###
delete a campaign
- campaignId is required in the path (:id)
returns a success message and the deleted campaign (json)

### DELETE /call/:id ###
delete a call
- call id is required in the path (:id)
returns a success message and the deleted call (json)

### DELETE /invite/:id ###
delete an invite
- invite id is required in the path (:id)
returns a success message and the deleted invite (json)
