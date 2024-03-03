const getRightAnswer = (question, answers) => {
    if (!answers.length) return null;

    const answer = answers.find(({ questionID }) => questionID == question.id)

    if (!answer) return null;

    return answer
}

export default getRightAnswer
