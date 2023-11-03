

export const fetchUserWorksheets = (id) => {
  return fetch(
    `http://localhost:8088/worksheets?_expand=grade&_expand=subject`,
  ).then((response) => response.json())
}

export const fetchAllStudentWorksheets = () => {
  return (
    fetch('http://localhost:8088/studentWorksheets?_expand=student&_expand=worksheet').then((response) => response.json())
  )
}

export const postWorksheetToDatabase = (object) => {
  return fetch("http://localhost:8088/worksheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
}

export const fetchStudentWorksheetById = (id) => {
  return fetch(
    `http://localhost:8088/worksheets?id=${id}&_expand=student&_expand=subject`,
  ).then((response) => response.json())
}

export const fetchExpandedStudentWorksheetByStudentId = (id) => {
  return fetch(
    `http://localhost:8088/studentWorksheets?studentId=${id}&_expand=worksheet`,
  ).then((response) => response.json())
}

export const deleteWorksheetFromDatabase = (id) => {
  return fetch(`http://localhost:8088/worksheets/${id}`, {
    method: "DELETE",
  })
}

export const fetchExpandedWorksheetById = (worksheetId, userId) => {
  return fetch(
    `http://localhost:8088/worksheets?id=${worksheetId}&userId=${userId}&_expand=subject&_expand=grade`,
  ).then((response) => response.json())
}

export const putWorksheetInDatabase = (object) => {
  return fetch(`http://localhost:8088/worksheets/${object.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
}

export const putStudentWorksheetInDatabase = (object) => {
  return (
    fetch(`http://localhost:8088/studentWorksheets/${object.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
  )
}

export const postStudentWorksheetToDatabase = (object) => {
  return fetch("http://localhost:8088/studentWorksheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
}

export const deleteStudentWorksheetFromDatabase = (id) => {
  return fetch(`http://localhost:8088/studentWorksheets/${id}`, {
    method: "DELETE",
  })
}