# Hospital Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Live Demo](#live-demo)
4. [Technology Stack](#technology-stack)
5. [Installation](#installation)
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

The Hospital Management System is a web-based application designed to streamline the operations of a hospital. It provides separate portals for receptionists and doctors, allowing efficient patient management and data visualization.

## Features

- Single login page for both receptionist and doctor portals
- Receptionist Portal:
  - Register new patients
  - Perform CRUD operations on patient records
- Doctor Portal:
  - View registered patients
  - Visualize patient registration statistics with graphs

## Live Demo

- Frontend: [https://hospital-client.onrender.com](https://hospital-client.onrender.com)
- Backend: [https://hospital-server-j4cu.onrender.com](https://hospital-server-j4cu.onrender.com)

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Recharts for data visualization

### Backend
- Ruby on Rails
- PostgreSQL database

## Installation

### Prerequisites
- Node.js and npm
- Ruby 2.7.0 or higher
- Rails 6.1.0 or higher
- PostgreSQL

### Frontend Setup

1. Clone the repository:
   ```
   git clone https://github.com/hkumariitr/hospital-client.git
   cd hospital-client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/hkumariitr/hospital-server.git
   cd hospital-server
   ```

2. Install dependencies:
   ```
   bundle install
   ```

3. Set up the database:
   ```
   rails db:create db:migrate db:seed
   ```

4. Start the Rails server:
   ```
   rails server
   ```

The API will be available at `http://localhost:3000`.

## API Documentation

For detailed API documentation, please refer to our [Postman API Documentation](https://documenter.getpostman.com/view/22545563/2sAXqzWdJw).

## Contributing

We welcome contributions to the Hospital Management System! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

