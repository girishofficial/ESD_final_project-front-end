import React from "react";

const StudentTable = ({ students }) => {
  console.log("StudentTable props:", students);
  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Roll Number</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Photograph</th>
          <th>CGPA</th>
          <th>Total Credits</th>
          <th>Graduation Year</th>
          <th>Domain</th>
          <th>Specialization</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.studentId}>
            <td>
              {student.firstName} {student.lastName}
            </td>
            <td>{student.rollNumber}</td>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.email}</td>
            <td>
              <img
                src={student.photographPath || "/default-image.png"}
                alt={`${student.firstName} ${student.lastName}'s photograph`}
                width="50"
              />
            </td>
            <td>{student.cgpa}</td>
            <td>{student.totalCredits}</td>
            <td>{student.graduationYear}</td>
            <td>{student.domainProgram}</td>
            <td>{student.specialisationName || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
