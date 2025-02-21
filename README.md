# RideMe - Online Cab and Taxi Booking Application

This application provides APIs for both users and captains.

## Models

### User Model
The User model is defined in [`backend/src/models/users.model.ts`](backend/src/models/users.model.ts) and contains the following properties:
- **fullname**: An object with `firstName` (required), and `lastName`.
- **email**: A unique and required string.
- **password**: A required hashed string.
- **profile**: A string representing profile picture URL or similar.
- **location**: A string for the user’s location.
- **isVerified**: A boolean indicating if the account is verified.
- **socketId**: A string for socket connection tracking.
- **otp**: A string for one-time password if used.

### Captain Model
The Captain model is defined in [`backend/src/models/captain.model.ts`](backend/src/models/captain.model.ts) and contains the following properties:
- **fullname**: An object with `firstName` (required), and `lastName`.
- **email**: A unique and required string.
- **password**: A required hashed string.
- **profile**: A string for the profile information.
- **location**: A string for the captain’s location.
- **isVerified**: A boolean indicating verification status.
- **socketId**: A string for socket tracking.
- **license**: A unique required string representing the driver's license.
- **status**: A string with allowed values `active` or `inactive`.
- **available**: A boolean indicating if the captain is available.
- **vehicle**: An object with details about the vehicle:
  - **color**: The vehicle color.
  - **plateno**: A unique string for the vehicle plate number.
  - **vehicleType**: One of the allowed types: `Car`, `Two-wheeler`, or `Auto`.
  - **capacity**: A number representing seating capacity.

## API Routes

### User Routes
Defined in [`backend/src/routes/user.route.ts`](backend/src/routes/user.route.ts), the User API endpoints are:

- **POST /api/v1/user/register**  
  **Request Body:**  
  ```json
  {
    "fullname": { "firstName": "John", "lastName": "Doe" },
    "email": "john@example.com",
    "password": "strongpassword"
  }
  ```  
  **Response:**  
  - On success: HTTP 201 with a success message, a refresh token, and user data (without password).
  - On failure: A JSON error message stating the issue.

- **POST /api/v1/user/login**  
  **Request Body:**  
  ```json
  {
    "email": "john@example.com",
    "password": "strongpassword"
  }
  ```  
  **Response:**  
  - On success: HTTP 200 with a success message, user data (without password), and token(s) (access and possibly refresh token).
  - On failure: A JSON error message (e.g., invalid credentials).

- **GET /api/v1/user/profile**  
  **Note:** Protected route – requires a valid token (provided in cookies or authorization header).  
  **Response:**  
  - On success: HTTP 201 with user data.
  - On failure: A JSON message indicating error (e.g., no user in the request).

- **GET /api/v1/user/logout**  
  **Note:** Protected route – requires a valid token.  
  **Response:**  
  - On success: Clears token cookies and returns a success message.
  - On failure: A JSON error message.

### Captain Routes
Defined in [`backend/src/routes/captain.route.ts`](backend/src/routes/captain.route.ts), the Captain API endpoints are:

- **POST /api/v1/captain/register**  
  **Request Body:**  
  ```json
  {
    "fullname": { "firstName": "Alice", "lastName": "Smith" },
    "email": "alice@example.com",
    "password": "strongpassword",
    "license": "LICENSE123",
    "vehicle": {
        "type": "Car",
        "plate": "UP-32-1234",
        "capacity": 4,
        "color": "Red"
    }
  }
  ```  
  **Response:**  
  - On success: HTTP 201 with a success message and a refresh token via cookies.
  - On failure: A JSON error message if the captain already exists or if validation fails.

- **POST /api/v1/captain/login**  
  **Request Body:**  
  ```json
  {
    "email": "alice@example.com",
    "password": "strongpassword"
  }
  ```  
  **Response:**  
  - On success: HTTP 200 with a success message, captain data, and token(s) (access and refresh tokens via cookies).
  - On failure: A JSON error message (e.g., captain not found or invalid password).

- **POST /api/v1/captain/profile**  
  **Note:** Protected route – requires a valid token (checked via [`backend/src/middlewares/captainAuth.middleware.ts`](backend/src/middlewares/captainAuth.middleware.ts)).  
  **Response:**  
  - On success: HTTP 200 with captain data.
  - On failure: A JSON error message indicating the error.

- **POST /api/v1/captain/profile (Logout Route)**  
  **Note:** Protected route – clears the access token cookie.  
  **Response:**  
  - On success: HTTP 200 with a success message for logout.
  - On failure: A JSON error message if the captain is not authenticated.

## Data Flow Summary

- **Registration:**  
  Both the user and captain registration endpoints expect a JSON payload containing the required details (including nested `fullname` objects). A successful registration returns the created user or captain details (excluding the password) along with token cookies.

- **Login:**  
  The login endpoints require an email and password. Successful authentication returns user or captain data (excluding the password) along with token cookies (access and refresh tokens).

- **Profile and Logout:**  
  Protected routes require valid tokens provided either in cookies or headers. The profile endpoints return the current authenticated user or captain’s data, while the logout endpoints clear the respective token cookies.

For more details on request validation and response structures, refer to the middleware and controller implementations in [`backend/src/controllers/user.controllers.ts`](backend/src/controllers/user.controllers.ts) and [`backend/src/controllers/captain.controllers.ts`](backend/src/controllers/captain.controllers.ts).
