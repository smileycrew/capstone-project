export const fetchSubjects = () => {
  return fetch("http://localhost:8088/subjects").then((response) =>
    response.json(),
  )
}