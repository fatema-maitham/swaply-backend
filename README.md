# Swaply

Swaply is a full-stack MERN skill-sharing platform where users can exchange skills with each other. Users can discover skills they want to learn, offer skills they can teach, send and manage skill swap requests, and review other users after completing a swap.

The platform also includes an admin side for managing users, skills, swap requests, and reviews.

## Planning Materials

### Trello Board

[Swaply Trello Board](https://trello.com/invite/b/6aa2a461a9e94d4fab436ab8/ATTI633568baa47f25f4ff4b77b4650889c62984E480/swaply)

## User Stories

### Guest User Stories

- As a guest, I can view the home page explaining how skill swap works.
- As a guest, I can browse available skills.
- As a guest, I can search for skills.
- As a guest, I can filter skills by category.
- As a guest, I can view the details of a specific skill.
- As a guest, I can view other users' profiles.
- As a guest, I can sign up for an account.
- As a guest, I can log in to my account.

### General User Stories

- As a user, I can log in to my account.
- As a user, I can log out of my account.
- As a user, I can view and edit my profile.
- As a user, I can add a skill that I can teach.
- As a user, I can view available skills.
- As a user, I can search for skills I want to learn.
- As a user, I can filter skills by category.
- As a user, I can view the details of a skill.
- As a user, I can edit my own skills.
- As a user, I can delete my own skills.
- As a user, I can send a skill swap request to another user.
- As a user, I can view my swap requests.
- As a user, I can view the details of a swap.
- As a user, I can accept a swap request.
- As a user, I can reject a swap request.
- As a user, I can cancel a swap request.
- As a user, I can mark a swap as completed.
- As a user, I can leave a review after completing a swap.
- As a user, I can view reviews.
- As a user, I can edit my own review.
- As a user, I can delete my own review.

### Admin User Stories

* As an admin, I can access an admin dashboard.
* As an admin, I can view platform statistics.
* As an admin, I can view all users.
* As an admin, I can enable or disable a user account.
* As an admin, I can delete a user account.
* As an admin, I can view all skills.
* As an admin, I can delete an inappropriate skill.
* As an admin, I can view all categories.
* As an admin, I can create a category.
* As an admin, I can edit a category.
* As an admin, I can delete a category.
* As an admin, I can view all swap requests.
* As an admin, I can view all reviews.
* As an admin, I can delete an inappropriate review.
* As an admin, I can view audit logs of administrative actions.

## ERD

![Swaply ERD](./plan/erd.png)

## Wireframes

![Swaply Wireframes](./plan/wireframes.png)

## Routes

### Auth Routes

| **HTTP Method** | **Controller** | **Response** | **URI**         | **Use Case**                  |
| --------------- | -------------- | -----------: | --------------- | ----------------------------- |
| POST            | signup         |          201 | `/auth/sign-up` | Create a new user account     |
| POST            | login          |          200 | `/auth/sign-in` | Login with email and password |

### User Routes

| **HTTP Method** | **Controller** | **Response** | **URI**          | **Use Case**             |
| --------------- | -------------- | -----------: | ---------------- | ------------------------ |
| GET             | getUser        |          200 | `/users/profile` | Get current user profile |
| PUT             | updateUser     |          200 | `/users/profile` | Update user profile      |
| DELETE          | deleteUser     |          200 | `/users/profile` | Delete user account      |

### Skill Routes

| **HTTP Method** | **Controller** | **Response** | **URI**            | **Use Case**              |
| --------------- | -------------- | -----------: | ------------------ | ------------------------- |
| POST            | createSkill    |          201 | `/skills`          | Create a new skill        |
| GET             | getSkills      |          200 | `/skills`          | List all available skills |
| GET             | showSkill      |          200 | `/skills/:skillId` | Get a single skill        |
| PUT             | updateSkill    |          200 | `/skills/:skillId` | Update a skill            |
| DELETE          | deleteSkill    |          200 | `/skills/:skillId` | Delete a skill            |

### Category Routes

| **HTTP Method** | **Controller**  | **Response** | **URI**                    | **Use Case**                  |
| --------------- | --------------- | -----------: | -------------------------- | ----------------------------- |
| GET             | getCategories   |          200 | `/categories`              | List all available categories |
| POST            | createCategory  |          201 | `/categories`              | Create a category             |
| PATCH           | updateCategory  |          200 | `/categories/:categoryId`  | Update a category             |
| DELETE          | deleteCategory  |          200 | `/categories/:categoryId`  | Delete a category             |

### Swap Routes

| **HTTP Method** | **Controller** | **Response** | **URI**          | **Use Case**                  |
| --------------- | -------------- | -----------: | ---------------- | ----------------------------- |
| POST            | createSwap     |          201 | `/swaps`         | Send a new skill swap request |
| GET             | getSwaps       |          200 | `/swaps`         | List user's swap requests     |
| GET             | showSwap       |          200 | `/swaps/:swapId` | Get a single swap             |
| PUT             | updateSwap     |          200 | `/swaps/:swapId` | Update swap status            |
| DELETE          | deleteSwap     |          200 | `/swaps/:swapId` | Cancel a swap request         |

### Review Routes

| **HTTP Method** | **Controller** | **Response** | **URI**              | **Use Case**                 |
| --------------- | -------------- | -----------: | -------------------- | ---------------------------- |
| POST             | createReview  |          201 | `/reviews`           | Create a review after a swap |
| GET              | getReviews    |          200 | `/reviews`           | List reviews                 |
| GET              | showReview    |          200 | `/reviews/:reviewId` | Get a single review          |
| PUT              | updateReview  |          200 | `/reviews/:reviewId` | Update a review              |
| DELETE           | deleteReview  |          200 | `/reviews/:reviewId` | Delete a review              |

### Admin Routes

| **HTTP Method** | **Controller**   | **Response** | **URI**                       | **Use Case**                       |
| --------------- | ---------------- | -----------: | ----------------------------- | ---------------------------------- |
| GET             | dashboard        |          200 | `/admin/dashboard`            | View platform statistics           |
| GET             | getUsers         |          200 | `/admin/users`                | List all users                     |
| PATCH           | toggleUserStatus |          200 | `/admin/users/:userId/status` | Enable or disable a user account   |
| DELETE          | deleteUser       |          200 | `/admin/users/:userId`        | Delete a user account              |
| GET             | getSkills        |          200 | `/admin/skills`               | List all skills                    |
| DELETE          | deleteSkill      |          200 | `/admin/skills/:skillId`      | Delete an inappropriate skill      |
| GET             | getSwaps         |          200 | `/admin/swaps`                | List all swap requests             |
| GET             | getReviews       |          200 | `/admin/reviews`              | List all reviews                   |
| DELETE           | deleteReview    |          200 | `/admin/reviews/:reviewId`    | Delete an inappropriate review     |
| GET              | getAuditLogs    |          200 | `/admin/audit-logs`           | View administrative action history |

## Component Hierarchy Diagram

![Swaply Component Hierarchy Diagram](./plan/component-hierarchy.png)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed or MongoDB Atlas account

### Installation

Clone the repository:

```bash
git clone https://github.com/fatema-maitham/swaply-frontend.git
```

Navigate into the project folder:

```bash
cd swaply-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root of the project:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the development server:

```bash
npm run dev
```

## Technologies Used

### Frontend

- React (Vite)
- JavaScript
- CSS
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Frontend Repository

[Swaply Frontend Repository](https://github.com/fatema-maitham/swaply-frontend.git)

## Future Enhancements

- Skill matching and recommendations
- Skill availability scheduling
- User skill badges
- Advanced skill discovery
- Saved skills
- User reputation system
- Notifications for swap requests
- In-app messaging
- Calendar integration
