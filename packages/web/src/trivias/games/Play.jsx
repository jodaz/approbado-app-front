import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ProgressBar from '../components/ProgressBar'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import AnswerPill from '../components/AnswerPill'
import OptionsForm from '../components/OptionsForm'
import Counter from '../components/Counter'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import PlayersList from '../components/PlayersList'
import { ShareBoxLine } from '@approbado/lib/icons'

const useStyles = makeStyles(theme => ({
    passQuestion: {
        color: theme.palette.info.dark,
        border: `2px solid ${theme.palette.info.dark}`,
        width: 'max-content'
    },
    resources: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        textDecoration: 'underline',
        height: 'fit-content',
        width: 'fit-content',
        fontSize: '1rem',
        marginTop: '0.5rem',
        color: theme.palette.info.light,
        '&:visited': {
            color: 'normal'
        }
    },
    icon: {
        fontSize: 'inherit',
        marginLeft: '0.5rem'
    }
}))

const getAnswer = (question, answers) => {
    if (!answers.length) return null;

    const answer = answers.find(({ questionID }) => questionID == question.id)

    if (!answer) return null;

    return answer
}

export default function() {
    const {
        questions,
        currQuestion: current,
        answers,
        configs,
        secs,
        room
    } = useTriviaState()
    const currQuestion = questions[current]
    const [currAnswer, setCurrentAnswer] = React.useState(null)
    const [isRight, setIsRight] = React.useState(null)
    const { passQuestion, unsetAnswer, setConfigs } = useTriviaDispatch()
    const classes = useStyles();
    const { type } = configs

    const handleNextQuestion = () => {
        if (current + 1 == questions.length) {
            const view = (configs.type == 'Reto') ? 'resume' : 'finished';

            setConfigs({
                ...configs,
                view: view
            });
        } else {
            passQuestion();
            unsetAnswer();
            setIsRight(null);
        }
    }

    React.useEffect(() => {
        const answer = getAnswer(currQuestion, answers)

        if (answer) {
            setIsRight(answer.is_right)
        }

        setCurrentAnswer(answer)
    }, [answers, currQuestion]);

    const { duration } = configs

    return (
        <Box padding='1rem'>
            {room.loaded && <PlayersList users={room.participants} />}
            {(duration != 0) && (
                <Counter sec={secs} />
            )}
            <ProgressBar current={current + 1} total={questions.length} />
            <Box sx={{ fontWeight: 600, margin: '2rem 0', height: '2rem' }}>
                {current + 1}. {currQuestion.description}
            </Box>
            <Box minHeight='10rem'>
                <OptionsForm {...currQuestion} />
            </Box>
            <Box padding='1rem 0'>
                {(isRight) ? (
                    <AnswerPill variant='success'>
                        ¡Respuesta correcta!
                    </AnswerPill>
                ) : (isRight == false) && (
                    <AnswerPill variant='danger'>
                        ¡Respuesta incorrecta!
                    </AnswerPill>
                )}
            </Box>
            <Box padding='1rem 0' minHeight='10rem'>
                {(isRight !== null) && (
                    <>
                        {(type == 'Práctica' && isRight == false) && (
                            <Box fontWeight={600}>
                                Respuesta correcta: {currAnswer.correctAnswer.statement}
                            </Box>
                        )}

                        {(currQuestion.explanation_type == isRight && currQuestion.explanation) && (
                            <Box>
                                Nota: {currQuestion.explanation}
                            </Box>
                        )}
                        <Box
                            className={classes.resources}
                            fontSize='0.9rem'
                            component={LinkBehavior}
                            to='/trivias'
                        >
                            Para más detalles ver recursos <ShareBoxLine className={classes.icon} />
                        </Box>
                    </>
                )}
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="outlined"
                    className={classes.passQuestion}
                    onClick={handleNextQuestion}
                    disabled={(current == questions.length || isRight != null)}
                    unresponsive
                >
                    Saltar pregunta
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    color="primary"
                    disabled={isRight == null}
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    )
}
