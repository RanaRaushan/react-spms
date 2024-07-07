Project Overview

Acess at [Smart Parking](https://main--sunny-strudel-e52bca.netlify.app/)

This project is a React application that uses Vite for rapid development, React Router for client-side routing, and Spring Boot for backend API and JWT authentication.

Technologies Used

- React
- Vite
- React Router
- Spring Boot
- JWT

Setup

1. Install Node.js and npm
2. Install Vite by running npm install --global vite
3. Clone the repository and navigate to the project directory
4. Run npm install to install dependencies
5. Start the application by running vite

Application Structure

- src folder contains the React application code
- src/components folder contains reusable components
- src/router folder contains route configurations
- utils folder contains API calls to Spring Boot backend

Login and Signup

- Login and signup forms are located in the login.jsx and singup.jsx
- Login credentials are sent to the Spring Boot backend for authentication
- Upon successful authentication, a JWT token is returned and stored in local storage
- The JWT token is used to authenticate subsequent API calls

Routing

- React Router is used for client-side routing
- Routes are defined in the src/routees folder
- Protected routes are authenticated using the JWT token

Spring Boot Backend

- The Spring Boot application is accessibale adn deployed at https://spms-latest.onrender.com/ 

Deployment

- The application can be deployed to a production environment by building the React application and serving it with a web server
- The Spring Boot backend can be deployed separately to a production environment

Development

- Run vite to start the application in development mode
- Make changes to the code and see the changes reflected in the application
- Use the React DevTools to debug the application
- Add .env for any configuration
