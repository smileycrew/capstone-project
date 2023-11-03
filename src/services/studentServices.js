export const fetchStudents = () => {
  return fetch("http://localhost:8088/students").then((response) =>
    response.json(),
  )
}

export const fetchUserStudents = (id) => {
  return fetch(
    `http://localhost:8088/students?userId=${id}&_expand=grade`,
  ).then((response) => response.json())
}

//this works with ANY student needs to change this
export const fetchStudentById = (id) => {
  return fetch(`http://localhost:8088/students/${id}`).then((response) =>
    response.json(),
  )
}

export const fetchUserStudentByIds = (userId, studentId) => {
  return fetch(
    `http://localhost:8088/students?id=${studentId}&userId=${userId}&_expand=grade`,
  ).then((response) => response.json())
}

export const fetchUserStudentById = (userId, studentId) => {
  return fetch(
    `http://localhost:8088/students?id=${studentId}&userId=${userId}&_expand=grade`,
  ).then((response) => response.json())
}

export const postStudentToDatabase = (studentObject) => {
  return fetch("http://localhost:8088/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentObject),
  })
}

export const putStudentInDatabase = (object) => {
  return fetch(`http://localhost:8088/students/${object.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
}

export const deleteStudentFromDatabase = (id) => {
  return fetch(`http://localhost:8088/students/${id}`, {
    method: "DELETE",
  })
}