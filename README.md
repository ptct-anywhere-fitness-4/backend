# API: https://bw-anywhere-fitness-backend.herokuapp.com/

## Login and Register

| Type | Endpoint           | Description         | Protected | Required                                   | Returns |
| ---- | ------------------ | ------------------- | --------- | ------------------------------------------ | ------- |
| POST | /api/auth/register | Create new user     | No        | username, password, secret code (optional) |         |
| POST | /api/auth/login    | Login existing user | No        | username, password, secret code (optional) | token   |

### Token is required for all endpoints listed below

## instructor

| Type | Endpoint                                          | Description                             | Protected | Required            | Returns |
| ---- | ------------------------------------------------- | --------------------------------------- | --------- | ------------------- | ------- |
| GET  | /api/instructor/                                  | Fetches instructors                     | Yes       |                     | array   |
| GET  | /api/instructor/:instructor_id                    | Fetches instructor by id                | Yes       | instructor_id       | object  |
| GET  | /api/instructor/:instructor_id/schedule           | Fetches instructor's schedueled classes | Yes       | instructor_id       | array   |
| GET  | /api/instructor/class/:class_id                   | Fetches a class by its id               | Yes       | class_id            | object  |
| GET  | /api/instructor/class/:class_id/roster            | Fetches a class' roster                 | Yes       | class_id            | array   |
| POST | /api/instructor/class                             | Adds an instructor's class              | Yes       | body                | object  |
| PUT  | /api/instructor/class/:class_id                   | Updates an instructor's class           | Yes       | body, class_id      | object  |
| PUT  | /api/instructor/class/:class_id/roster/:client_id | Updates a client's attendance in roster | Yes       | class_id, client_id | object  |
| DEL  | /api/instructor/class/:class_id                   | Deletes a class by its id               | Yes       | class_id            | integer |

## client

| Type   | Endpoint                                  | Description                     | Protected | Required            | Returns |
| ------ | ----------------------------------------- | ------------------------------- | --------- | ------------------- | ------- |
| GET    | /api/client/:id                           | Instructor fetch client by id   | Yes       |                     | object  |
| GET    | /api/client/:client_id/classes/registered | Get client's registered classes | Yes       | client_Id           | array   |
| POST   | /api/client/:client_id/classes/:class_id  | Register client for class       | Yes       | client_id, class_id |         |
| DELETE | /api/client/:client_id/classes/:class_id  | Unregister client from class    | Yes       | client_id, class_id | integer |

## classes

| Type | Endpoint                                                   | Description                    | Protected | Required | Returns |
| ---- | ---------------------------------------------------------- | ------------------------------ | --------- | -------- | ------- |
| GET  | /api/client/classes/all                                    | Grabs all classes              | Yes       |          | array   |
| GET  | /api/client/classes/:class_id                              | Fetch class by id              | Yes       | class_id | object  |
| GET  | /api/client/classes/filter/:filter (don't think we'll use) | Fetch & sort classes by filter | Yes       | filter   | array   |
