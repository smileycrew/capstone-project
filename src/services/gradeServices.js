export const fetchGrades = () => {
  return fetch("http://localhost:8088/grades").then((response) =>
    response.json(),
  )
}