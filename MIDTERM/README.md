☕ Daily Grind Coffee App (Full-Stack)

The Daily Grind Coffee App is a complete, full-stack solution built to serve as a customer-facing menu system for a coffee shop. It was created as a university practical project (CS375) focused on demonstrating proficiency in Node.js/Express backend development and React Native (Expo) frontend consumption of a MongoDB database.

✨ Features

📩 Full-Stack Architecture

  Frontend:React Native (Expo Router)
  Backend:Node.js / Express
  Database:MongoDB Atlas (Mongoose ODM)

📋 Menu & Discovery Functionality

  "View Full Menu" Button: Triggers a modal screen that fetches and displays all in-stock items from the database.
  "Surprise Me\!" Button: Fetches a single random in-stock item from the backend, displaying the name and price via an alert.
  Stock Filtering: Both API endpoints ensure that only items with `inStock = true` are returned to the user, satisfying the core requirement.

-----

🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| Frontend | React Native, Expo |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Languages | JavaScript/TypeScript |

-----

🚀 How to Run

The project is divided into separate `backend` and `frontend` folders. Use two terminal windows to run both parts concurrently.

🪙 Prerequisites

  Node.js (v18+)
  MongoDB Atlas account (with your IP whitelisted)
  Expo Go app on a smartphone (must be on the same Wi-Fi network as the PC).

💻 Backend Setup

1.  Navigate to the `backend` folder and run `npm install`.
2.  Create a file named `.env` in the `backend/` folder:
    ```env
    # Replace the placeholders with your actual MongoDB connection string.
    MONGO_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/coffee_shop_db?retryWrites=true&w=majority"
    PORT=3000
    ```
3.  Run the server:
    ```bash
    node server.js
    ```
    Expected output: `Success: Connected to MongoDB` and `Coffee shop server running on port 3000`.

📲 Frontend Setup

1.  Navigate to the `frontend` folder and run `npm install`.
2.  API URL: Check `frontend/apiConfig.js` and set the `API_URL` to your backend server's IP (e.g., `http://10.0.2.2:3000/api` for Android Emulator).
3.  Run the app (Hard Reset Recommended): Use the `-c` flag to clear the Metro cache.
    ```bash
    npx expo start -c
    ```
4.  Scan the QR code using the Expo Go app on your phone.

-----

🔍 API Endpoints

Both endpoints are filtered to return only items where `inStock = true`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/menu` | Full Menu:Retrieves all in-stock items. |
| `GET` | `/api/menu/random` | Random Item: Retrieves a single, random in-stock item. |

-----

📹 Project Demonstration Recording

The video recording demonstrating the full functionality of the application is located in the root directory of this repository.

  File Name: `demovideo.mp4`.

-----
👨‍💻 Author

Muhammad Ali| m.aliwajid1@gmail.com

🗃️ License

Licensed under the MIT License.