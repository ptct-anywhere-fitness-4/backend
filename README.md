# Base URL: https://bw-anywhere-fitness-backend.herokuapp.com/

## Login and Register

| Type | Endpoint           | Description         | Protected | Required                                   | Returns |
| ---- | ------------------ | ------------------- | --------- | ------------------------------------------ | ------- |
| POST | /api/auth/register | Create new user     | No        | username, password, secret code (optional) |         |
| POST | /api/auth/login    | Login existing user | No        | username, password, secret code (optional) | token   |

### Token is required for all endpoints listed below

## client

| Type | Endpoint        | Description                   | Protected | Required | Returns |
| ---- | --------------- | ----------------------------- | --------- | -------- | ------- |
| GET  | /api/client/:id | Instructor fetch client by id | Yes       |          | object  |

## classes

| Type | Endpoint                                                   | Description                    | Protected | Required | Returns |
| ---- | ---------------------------------------------------------- | ------------------------------ | --------- | -------- | ------- |
| GET  | /api/client/classes/all                                    | Grabs all classes              | Yes       |          | array   |
| GET  | /api/client/classes/:class_id                              | Fetch class by id              | Yes       | class_id | object  |
| GET  | /api/client/classes/filter/:filter (don't think we'll use) | Fetch & sort classes by filter | Yes       | filter   | array   |

## registration

| Type   | Endpoint                                  | Description                     | Protected | Required            | Returns |
| ------ | ----------------------------------------- | ------------------------------- | --------- | ------------------- | ------- |
| GET    | /api/client/:client_id/classes/registered | Get client's registered classes | Yes       | client_Id           | array   |
| POST   | /api/client/:client_id/classes/:class_id  | Register client for class       | Yes       | client_id, class_id |         |
| DELETE | /api/client/:client_id/classes/:class_id  | Unregister client from class    | Yes       | client_id, class_id | integer |
