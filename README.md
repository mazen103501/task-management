## Deployed Application

The application is deployed on Netlify and can be accessed at [Task Management](https://mazen-taha-task-management.netlify.app/).
you dont have to install the and clone the project to run it

# Task Management

This project is a task management application built with Angular. It allows users to manage tasks, set priorities, and track the status of each task.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js and npm: Download from [Node.js](https://nodejs.org/).
- Angular CLI: Install using the command:

  ```sh
  npm install -g @angular/cli
  ```

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mazen103501/task-management.git
   ```

2. Navigate to the project directory:
   ```sh
   cd task-management
   ```

3. Install the required packages:
   ```sh
   npm install --legacy-peer-deps
   ```

### Development Server

Run the following command to start the development server:

```sh
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

### Build

Run the following command to build the project:

```sh
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

Run the following command to execute the unit tests via Karma:

```sh
ng test
```

## Features

- Create, edit, and delete tasks
- Set task priorities (e.g., High, Medium, Low)
- Track task statuses (e.g., Pending, In Progress, Completed)
- Responsive design for desktop and mobile devices
- And More...
