export const postQuestionAndAnswerToDatabase = (questionsAndAnswersToSave, worksheetId) => {

  for (const questionAndAnswerToSave of questionsAndAnswersToSave) {
    questionAndAnswerToSave.worksheetId = worksheetId
    fetch("http://localhost:8088/questionsAndAnswers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionAndAnswerToSave),
    })
  }
}