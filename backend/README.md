# Full Stack Meeting Room BACKEND

This is the backend codebase for a Full Stack Meeting Room application built with [Node.js](https://nodejs.org/).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Libraries Used](#libraries-used)
- [Folder Structure](#folder-structure)
- [Endpoints](#endpoints)
- [Database Schema](#database-schema)

## Features

- Retrieve a list of all rooms
- Retrieve details of a specific room
- Search for available rooms based on date and capacity
- Retrieve a list of all bookings
- Create a new booking

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Configuration

Create a `.env` file in the root directory and set the following environment variables:

```env
PORT=3000
DATABASE_URL=mongodb://<username>:<password>@<cluster-url>/<database-name>
```

## Libraries Used

The following libraries are used in this project:

- [Express](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
- [Mongoose](https://mongoosejs.com/): A MongoDB object modeling tool designed to work in an asynchronous environment.
- [Cors](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- [Helmet](https://helmetjs.github.io/): Middleware to set various HTTP headers for enhanced security.
- [Dotenv](https://www.npmjs.com/package/dotenv): Module to load environment variables from a .env file.
- [Nodemon](https://nodemon.io/): A utility that monitors for changes and automatically restarts the server.

## Folder Structure

The project structure is organized as follows:

```bash
/backend
│
├── /routes
│   ├── roomRouter.js
│   └── bookingRouter.js
│
├── /services
│   ├── roomServices.js
│   └── bookingServices.js
│
├── /models
│   ├── room.js
│   └── booking.js
│
├── /db
│   └── db.js
│
├── server.js
├── .env
```

- `/routes`: Express route handlers for rooms and bookings.
- `/services`: Implements business logic, interacting with models and handling requests.
- `/models`: Mongoose schemas for room and booking entities.
- `/db`: Manages database connection and setup.
- `server.js`: Main application.
- `.env`: Environment variables configuration.

## Endpoints

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/rooms`                             | Retrieve a list of all rooms.            |
| `GET`    | `/api/available/:date/:capacity`         | Search for available rooms based on date and capacity. |
| `GET`    | `/api/rooms/:id`                         | Retrieve details of a specific room.                       |
| `GET`    | `/api/bookings`                          | Retrieve a list of all bookings.                 |
| `POST`   | `/api/booking`                           | Create a new booking.                 |

### Examples

#### Retrieve a list of all rooms

Endpoint:

```ruby
GET /api/rooms
```

Response:

```json
[
  {
    "_id": "1",
    "name": "Sirius",
    "capacity": 2,
    "bookings": []
  },
  {
    "_id": "2",
    "name": "Arcturus",
    "capacity": 4,
    "bookings": []
  }
]
```

#### Retrieve details of a given room by id

Endpoint:

```ruby
GET /api/rooms/:id
```

Response:

```json
{
  "_id": "1",
  "name": "Sirius",
  "capacity": 2,
  "bookings": [
    {
      "_id": "1",
      "start_date": "2023-11-20T09:00:00Z",
      "end_date": "2023-11-20T11:00:00Z",
      "email": "john.doe@test.com"
    }
  ]
}
```

#### Search for available rooms and timeslots by a given date and capacity

Endpoint:

```ruby
GET /api/available/:date/:capacity
```

Response:

```json
{
  "timeslot_duration": 30,
  "rooms": [
    {
      "_id": "1",
      "name": "Sirius",
      "capacity": 2,
      "bookings": [
        "2023-11-20T09:00:00Z",
        "2023-11-20T09:30:00Z",
        "2023-11-20T10:00:00Z"
      ]
    },
    {
      "_id": "2",
      "name": "Arcturus",
      "capacity": 4,
      "bookings": [
        "2023-11-20T10:00:00Z",
        "2023-11-20T10:30:00Z"
      ]
    }
  ]
}
```

#### Retrieve a list of all bookings

Endpoint:

```ruby
GET /api/bookings
```

Response:

```json
{
  "count": 2,
  "bookings": [
    {
      "_id": "1",
      "room": {
        "_id": "1",
        "name": "Sirius",
        "capacity": 2
      },
      "start_date": "2023-11-20T09:00:00Z",
      "end_date": "2023-11-20T11:00:00Z",
      "email": "john.doe@test.com"
    },
    {
      "_id": "2",
      "room": {
        "_id": "2",
        "name": "Arcturus",
        "capacity": 4
      },
      "start_date": "2023-11-21T14:00:00Z",
      "end_date": "2023-11-21T16:00:00Z",
      "email": "jane.doe@test.com"
    }
  ]
}
```

#### Create a new booking

Endpoint:

```ruby
POST /api/booking
```

Request:

```json
{
  "room": "1",
  "start_date": "2023-11-22T10:30:00Z",
  "end_date": "2023-11-22T11:30:00Z",
  "email": "james.doe@test.com"
}
```

Response:

```bash
item saved to database
```

## Database Schema

### Room

- `_id_ ` (ObjectId)
- `name ` (String, required): Name of the room.
- `capacity ` (Number, required): Capacity of the room.

### Booking

- `_id_ ` (ObjectId)
- `room ` (ObjectId, required): Reference to the booked room.
- `start_date ` (Date, required): Start date and time of the booking.
- `end_date ` (Date, required): End date and time of the booking.
- `booked_for ` (String, required): Email associated with the booking.

   