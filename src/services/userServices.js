export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((response) =>
    response.json(),
  )
}

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json())
}

export const fetchUserById = (id) => {
  return fetch(`http://localhost:8088/users/${id}`).then((response) =>
    response.json(),
  )
}

export const putUserToDatabase = (object) => {
  return fetch(`http://localhost:8088/users/${object.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  }).then((response) => response.json())
}