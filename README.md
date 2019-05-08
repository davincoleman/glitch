Welcome to Deposit Solution Mocks
=================================

These endpoints can be used to mock the Deposit Solution API.
POST to the identity-check endpoint with a customer profile to start a check.
The response is a new identity check resource with a status indicating the progress of the check.
Poll the endpoint to track progress.

Scenario
--------

- start an identity check: POST /identity-check
  - requires customerReference. This field is treated as the idempotent key.
    If a new POST is made using a previous customerReference key, then the associated check is returned with a 200 response.
  - a success returns 200 an the JSON response contains a check ID and a status
  - The 'location' header provides the new resource endpoint which can be polled
- poll the progress of identity check: GET /identity-check/{id}
  - 

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
