# Get Me A Chai ☕️ - Crowdfunding Application

Get Me A Chai is a crowdfunding application where users can donate to various projects or causes. The app allows users to contribute through secure payment options and provides an intuitive interface for project management. 🚀

## Tech Stack 💻

- **Next.js**: A React framework for building production-ready web applications.
- **MongoDB**: A NoSQL database for storing user and project data.
- **Razorpay**: A payment gateway integration for handling donations.
- **NextAuth.js**: Authentication library to manage OAuth (Google, GitHub) authentication.

## Features ✨

- **User Authentication**: Login via GitHub and Google OAuth using NextAuth.js. 🔐
- **Crowdfunding**: Users can contribute to various projects using Razorpay. 💸
- **MongoDB**: Stores user data and project information securely. 🛡️
- **Real-Time Updates**: Tracks donations and project progress in real-time. ⏱️

## Prerequisites ✅

Make sure you have the following installed on your local machine:

- **Node.js** (v14 or later) 🟢
- **npm** 📦
- **MongoDB Account** (for your database connection) 🌐
- **GitHub OAuth Credentials** and **Google OAuth Credentials** 🔑
- **Razorpay Account** (for handling payments) 💳

## Setup 🛠️

Follow these steps to run the project locally:

### 1. Clone the Repository
Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Pradyumn-Chaudhary/Get-Me-A-Chai.git
cd Get-Me-A-Chai

```

### 2. Install Dependencies
nstall the necessary npm dependencies:

```
npm install
```

### 3. Environment Variables
Create a .env.local file in the root of your project and add the following environment variables. Replace the placeholders with your actual credentials.

```
NEXT_PUBLIC_NEXTAUTH_URL=<your_next_auth_url>
NEXTAUTH_SECRET=<your_next_auth_secret>

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>

# Google OAuth Credentials
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

# MongoDB Connection String
MONGODB_URI=<your_mongodb_url>
```

### 4. Run the Application Locally
Now you can run the app locally by using:

```
npm run dev
```
Your app will be running on http://localhost:3000. 🌍

## Contributing 🤝
Feel free to fork the repository, submit issues, and contribute to the development of this project.

## License 📄
This project is licensed under the MIT License.

## Author 👤
**Pradyumn Chaudhary**
