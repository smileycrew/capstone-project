// this is fetching USER ONLY likes from database
export const fetchUserLikes = (userId) => {
    return (
        fetch(`http://localhost:8088/likes?userId=${userId}`).then((response) => response.json())
    )
}
// this is posting the new like to the database
export const postLikeToDatabase = (likeId) => {
    return (
        fetch("http://localhost:8088/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeId),
        }).then((response) => response.json())
    )
}
// this is to delete the like from the database
export const deleteLikeFromDatabase = (likeId) => {
    return fetch(`http://localhost:8088/likes/${likeId}`, {
        method: "DELETE",
    }).then((data) => data.json())
}