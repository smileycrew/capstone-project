export const fetchUserWorksheets = (id) => {
  return fetch(
    `http://localhost:8088/worksheets?userId=${id}&_expand=student&_expand=subject`,
  ).then((response) => response.json())
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

export const deleteWorksheetFromDatabase = (id) => {
  return fetch(`http://localhost:8088/worksheets/${id}`, {
    method: "DELETE",
  })
}

export const fetchExpandedWorksheetById = (id) => {
  return fetch(
    `http://localhost:8088/worksheets?id=${id}&_expand=student&_expand=subject`,
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