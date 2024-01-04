# Full-Stack MERN Project ECOMMERCE WEBSITE

This repository contains a full-stack MERN (MongoDB, Express, React, Node.js) project. The project consists of separate backend and frontend folders.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm must be installed. You can download them from [Node.js official website](https://nodejs.org/).

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/CoderSwarup/MERN_Ecommerce_website.git
```

# Backend Setup

Navigate to the backend folder:

```bash
cd full-stack-mern/backend
```

Install backend dependencies:

```bash
npm install
```

## Create a .env file in the backend folder with the following content:

```bash

PORT=3000
# MONGO_URL="mongodb://127.0.0.1:27017/samcomm"
MONGO_URL= Your Mongo URl

//JWT TOKENS
JWT_SECRET=
REFRESH_TOKEN_SECRET=

// For Maill Service
NODEMAILER_SERVICE=
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=

//For Images Upload
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

//For Paymrnt
STRIPE_PUBLIC_API_KEY=
STRIPE_SECRET_KEY=

//For Google Login
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


CLIENT_URL=http://localhost:5173/
```

# Run the backend server:

```bash
npm run dev
```

The backend server will run on port 3000.

---

# Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd Frontend
```

## Install frontend dependencies:

```bash
npm install
```

## Start the frontend development server:

```bash
 npm run dev
```

The frontend server will start, and the application will open in your default browser.

# 💖😍 Contributing

Contributions are welcome! Please create a pull request for any improvements or fixes you'd like to add.
