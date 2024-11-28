# **Student Specialization Management System**

This application allows employees in the admin department to log in, view all student specializations, and filter them based on various criteria such as domain and specialization. The specialization for each student is determined based on their selected courses, with a specialization being assigned if the cumulative credit sum for that specialization exceeds **20 credits**.

## **Features**
- **Employee Login**: Secure login for employees of the admin department.
- **View Student Specializations**: List all students with their assigned specializations.
- **Filtering Options**:
  - By Domain (e.g., CSE, ECE, Mechanical).
  - By Specialization (e.g., Data Science, Computer Science, etc.).
- **Specialization Calculation**: Dynamically calculates specializations based on student course credits.

## **Technologies Used**
### **Backend**: Spring Boot
- **Authentication**: Handled securely using JWT (JSON Web Tokens).
- **APIs**:
  - Retrieve all students and their specializations.
  - Recalculate student specializations based on updated course data.
- **Database**: Persistent storage for student data, courses, and employee information.

### **Frontend**: React
- **UI Components**:
  - Employee Login Page.
  - Dashboard to view and filter student specializations.
- **State Management**: Managed using React's `useState` and `useEffect` hooks.
- **API Integration**: Fetches data from the Spring Boot backend using the Axios API.

## **Installation and Setup**
### **Backend**
1. Clone the repository:
   ```bash
   https://github.com/girishofficial/ESD_final_project-backend.git
   ```
### **Frontend**
1. Clone the repository:
   ```bash
   https://github.com/girishofficial/ESD_final_project-front-end.git
   ```
2. npm install
3. npm start
