# EduMation - Educational App
<p align="center">
  <a href="https://github.com/DenverCoder1/readme-typing-svg"><img src="https://readme-typing-svg.herokuapp.com?color=2962FF&center=true&lines=EduMation+Education+Management;&width=500&height=50""></a>
</p>
EduMation is an engaging educational app that offers a wide range of features to enhance your learning experience, streamline course management, and facilitate time management for schools and universities.

## Features

### Course Planner

- Plan your courses with ease by adding, editing, or deleting courses, assignments, and exams.
- View and manage your course schedule in a user-friendly calendar format.
- Set reminders and notifications for upcoming classes and assignments.

### Teacher Time Management

- Teachers can set their availability and schedule classes efficiently.
- Access a personalized dashboard to view schedules and upcoming classes.
- Coordinate with students effortlessly to ensure a smooth learning experience.

### Quiz Generator

- Teachers can create quizzes with various question types, including multiple-choice, true/false, and short answer questions.
- Customize quiz difficulty levels, time limits, and scoring.
- Evaluate student performance with detailed quiz reports.

### Gamification

- Earn points and rewards for completing assignments, attending classes, and achieving learning milestones.
- Compete with fellow students through leaderboards.
- Unlock virtual badges, trophies, and achievements to motivate your learning journey.

### Progress Tracking

- Monitor your learning progress and study habits.
- Identify areas that need improvement through comprehensive progress reports.
- Stay motivated by tracking your achievements and improvements over time.

### Discussion Forum

- Engage with your peers in a dedicated discussion forum.
- Ask questions, share knowledge, and seek help on course-related topics.
- Encourage teachers to participate in discussions to foster a collaborative learning environment.

### Resources Library

- Access a rich repository of educational resources, including articles, videos, and study materials.
- Upload and share course materials with fellow students and teachers.
- Easily find and retrieve valuable learning materials.

### Notifications and Reminders

- Receive timely notifications and reminders for classes, assignments, and quizzes.
- Customize your notification preferences to stay informed without being overwhelmed.

### User Profiles

- Create and personalize user profiles with your information and preferences.
- Connect with other users, build a network, and collaborate on learning initiatives.

## Getting Started

To get started with EduMation, follow these steps:

1. Sign up for an account on the EduMation platform.
2. Explore the intuitive dashboard to access various features.
3. Customize your profile and set your learning preferences.
4. Start planning your courses, attending classes, and participating in quizzes.
5. Collaborate with your peers and engage in discussions to enhance your learning journey.

## Feedback and Support

We value your feedback! If you encounter any issues, have suggestions, or need assistance, please don't hesitate to [contact our support team](mailto:support@EduMation.com).

## API Documentation

Base URL
http://"<your-domain>"/api

### Endpoints :

# 👤 Users

The User schema defines the structure of user data in the database.

- `name`: The name of the user.
- `email`: The email address of the user. It is stored in lowercase and is unique.
- `profileImage`: URL to the user's profile image.
- `passwordHash`: Hashed password for the user.
- `role`: The role of the user, which can be 'admin', 'teacher', 'school', or 'student'.
- `schoolId`: A list of Schools IDs document if the user is associated with a school.
- `groups`: A list of Groups IDs that the user is enrolled in or teaching.
- `creationDate`: The date and time when the user was created.
- `updateDate`: The date and time when the user was last updated.

### Routes

- GET /users: Retrieve a list of all users.
- POST /users: Create a new user.
- GET /users/:id: Retrieve a user by ID.
- PUT /users/:id: Update a user by ID.
- DELETE /users/:id: Delete a user by ID.

# 🏫 Schools

The School schema defines the structure of school data in the database.

- `name`: The name of the school.
- `address`: The physical address of the school.
- `contactInfo`:
  - `phone`: Contact phone number for the school.
  - `email`: Contact email address for the school.
  - `website`: Website URL for the school.
- `createdAt`: The date and time when the school record was created.
- `updatedAt`: The date and time when the school record was last updated.

### Routes

- GET /schools: Retrieve a list of all schools.
- POST /schools: Create a new school.
- GET /schools/:id: Retrieve a school by ID.
- PUT /schools/:id: Update a school by ID.
- DELETE /schools/:id: Delete a school by ID.

# ❔ Quizzes

The Quiz schema describes the structure for storing quiz information in the database.

- `courseId`: Reference to the associated Course document.
- `title`: The title of the quiz.
- `questions`: A list of questions, each including:
  - `questionText`: The text of the question.
  - `options`: An array of possible answers.
  - `correctAnswer`: The correct answer for the question.
- `timeLimit`: The time limit for the quiz, expressed in minutes.
- `creationDate`: The date and time when the quiz was created.
- `updateDate`: The date and time when the quiz was last updated.

### Routes

- GET /quizz: Retrieve a list of all quizzes.
- POST /quizz: Create a new quiz.
- GET /quizz/:id: Retrieve a quiz by ID.
- PUT /quizz/:id: Update a quiz by ID.
- DELETE /quizz/:id: Delete a quiz by ID.

# 📅 Schedules

The Schedule schema outlines the structure for storing scheduling information in the database.

- `groupId`: Reference to the associated Group for the schedules.
- `courseId`: Reference to the associated Courses for the schedules.
- `recurring`: Indicates whether the schedule is recurring.
- `creationDate`: The date and time when the schedule was created.
- `updateDate`: The date and time when the schedule was last updated.

### Routes

- GET /schedules: Retrieve a list of all schedules.
- POST /schedules: Create a new schedule.
- GET /schedules/:id: Retrieve a schedule by ID.
- PUT /schedules/:id: Update a schedule by ID.
- DELETE /schedules/:id: Delete a schedule by ID.

# 👥 Groups

The Group schema represents the structure for storing group information in the database.

- `name`: The name of the group.
- `schoolId`: Reference to the associated School document.
- `studentIds`: A list of references to User documents representing students in the group.
- `creationDate`: The date and time when the group was created.
- `updateDate`: The date and time when the group was last updated.

### Routes

- GET /groups: Retrieve a list of all groups.
- POST /groups: Create a new group.
- GET /groups/:id: Retrieve a group by ID.
- PUT /groups/:id: Update a group by ID.
- DELETE /groups/:id: Delete a group by ID.

# 👨‍🏫 Courses

The Course schema defines the structure for storing course information in the database.

## Fields

- `title`: The title of the course.
- `description`: A brief description of the course.
- `schoolId`: Reference to the associated School document.
- `teacherId`: Reference to the User document representing the course's teacher.
- `groupId`: Reference to the Group document associated with the course.
- `quizIds`: A list of references to Quiz documents related to the course.
- `timeline`:
  - `startDate`: The start date of the course.
  - `endDate`: The end date of the course.
- `creationDate`: The date and time when the course was created.
- `updateDate`: The date and time when the course was last updated.

### Routes

- GET /courses: Retrieve a list of all courses.
- POST /courses: Create a new course.
- GET /courses/:id: Retrieve a course by ID.
- PUT /courses/:id: Update a course by ID.
- DELETE /courses/:id: Delete a course by ID.

## General Notes

- All endpoints require proper authentication tokens unless specified otherwise.
- Data should be sent in a JSON format.
- Success and error messages are provided in a JSON format response.
- It's recommended to handle potential errors like unauthorized access, data validation errors, and server-side exceptions gracefully in the frontend.

## License

This project is licensed under the [MIT License](LICENSE).

Happy Learning with EduMation!
