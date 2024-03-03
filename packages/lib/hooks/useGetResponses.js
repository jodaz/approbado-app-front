export const useGetResponses = (questions, answers) => {
    const responses = answers.map(({
        question_id,
        is_right,
        statement
    }) => ({
        question_id,
        statement,
        is_right
    }))

    for (let i = 0; i < responses.length; i++) {
        for (let y = 0; y < questions.length; y++) {
            if (questions[y].id == responses[i].question_id) {
                questions[y].answer = responses[i].statement
                questions[y].is_right = responses[i].is_right
            }
        }
    }

    return ({ responses: questions });
}
