- **Homepage** - Displaying Login and Signup buttons as well as company information.
- **Login** - The Ambassadors want to log in so they can see their clients! 😎
- **Sign Up** - Name , Email , Password, Confirm Password, Photo Upload, Promo Code, "Create Account" Button -> Link to /dashboard, “Already have an account" Button-> Link to /login.
- **Dashboard Admin Page** - View clients information from all Ambassadors.
- **Dashboard Ambassador Page**- View Own clients (view only his Promo code clients).
- **Dashboard Admin Page** - View clients information from all Ambassadors.
- **Houses Page** - View available apartments and select the adequate ones to send each client.
- **Edit Client Page** - Edit clients information.
- **Create Client Page** - Create new clients.
- **Logout** - The users need to be able to close their session once finished navigating so no one can get back to their account. 👋
- **404** - As users, we want to be politely warned that this page does not exist and it was our fault to search for it. ⚠️
- **500** - As users, we want to be politely warned that the amazing team behind the project screwd it up and it's not our fault. 💔


## Server Routes (back-end)

| **Method** | **Route**               | **Description**                                                   | **Request - Body** |
| ---------- | ----------------------- | ----------------------------------------------------------------- | ------------------ |
| `GET`      | `/`                     | Main page route. Renders home `index` view.                       |                    |
| `GET`      | `/login`                | Renders `login-form` view.                                        |                    |
| `GET`      | `/signup`               | Renders `signup-form` view.                                       |                    |
| `POST`     | `/login`                | Sends Login form data to the server and redirects to dashboard.   |                    |
| `Post`     | `/signup`               | Sends Signup form data to the server and redirects to Login.      |                    |
| `GET`      | `/admin`                | Renders `dashboard` form view.                                    |                    |
| `GET`      | `/dashboard/ambassador` | Renders `dashboard-ambassador` form view.                         |                    |
| `POST`     | `/dashboard/admin`      | Sends form data to the server on `dashboard-admin`                |                    |
| `GET`      | `/logout`               | Delete the session from the sessions collection.                  |                    |
| `GET`      | `/clients`              | Renders client-view to see all clients                            |                    |
| `GET`      | `/client-update`        | Renders the edit client Post form                                 |                    |
| `POST`     | `/client-update`        | Sends update form data to the server and redirects to Clients.    |                    |
| `GET`      | `/clientsadd`           | Renders client-add view Post form                                 |                    |
| `POST`     | `/clientsadd`           | Sends clientadd form data to the server and redirects to Clients. |                    |

## Models

Ambassador model

```
{
	"name": String,
	"lastName": String,
	"Email": String
	"Password": String
	"Image": String
	"Promocode": String
	"role": {type: String, enum:["Admin","Ambassador", "Client"]}
  }
```

Client model

```
{
	"name": String,
	"lastName": String,
	"Email": String
	"Promocode": String
	ambassador: { type: Schema.Types.ObjectId, ref: “Ambassador” },
  }
```

## Backlog

- Create a public API with the db we made.

## Links

#### Git

https://github.com/pedrogancho/In-Life

https://in-life.herokuapp.com/

#### Slides

https://app.slidebean.com/p/hvi0rfalrc/Ironhack-Project-2-Inlife-Ambassadors
