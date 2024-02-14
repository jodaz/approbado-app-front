import * as React from 'react'
import { IGame, GameContextType } from '../types/providers';
import { Subtheme, Trivia } from '../types/models';
import { IComp } from '../types';

enum GameActionType {
    SET_TRIVIA = 'SET_TRIVIA',
    ADD_THEME = 'ADD_THEME',
    SET_QUESTIONS = 'SET_QUESTIONS',
    REMOVE_THEME = 'REMOVE_THEME',
    RESET_GAME = 'RESET_GAME',
    SET_CONFIGS = 'SET_CONFIGS',
    NEXT_QUESTION = 'NEXT_QUESTION',
    SET_ANSWER = 'SET_ANSWER',
    SET_RESULTS = 'SET_RESULTS'
}

interface GameAction {
    type: GameActionType;
    payload: any;
}

const initialState: IGame = {
    trivia: null,
    themes: [],
    level: null,
    type: null,
    duration: null,
    questions: [],
    answers: [],
    currQuestion: 0,
    correctAnswers: 0,
    totalPoints: 0
}

const GameContext = React.createContext<GameContextType>({ state: initialState, dispatch: () => null })

function gameReducer(state: IGame, action: GameAction): IGame {
    switch (action.type) {
        case GameActionType.SET_TRIVIA: {
            return {
                ...state,
                trivia: action.payload
            }
        }
        case GameActionType.NEXT_QUESTION: {
            return {
                ...state,
                currQuestion: state.currQuestion + 1
            }
        }
        case GameActionType.SET_CONFIGS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GameActionType.SET_ANSWER: {
            return {
                ...state,
                answers: [...state.answers, action.payload]
            }
        }
        case GameActionType.SET_RESULTS: {
            return {
                ...state,
                correctAnswers: action.payload.rights,
                totalPoints: action.payload.points
            }
        }
        case GameActionType.ADD_THEME: {
            return {
                ...state,
                themes: [...state.themes, action.payload]
            }
        }
        case GameActionType.SET_QUESTIONS: {
            return {
                ...state,
                questions: action.payload
            }
        }
        case GameActionType.REMOVE_THEME: {
            return {
                ...state,
                themes: state.themes.filter(({ id }) => id != action.payload.id)
            }
        }
        case GameActionType.RESET_GAME: {
            return initialState
        }
        default: {
            console.log(`Unhandled action type: ${action.type}`)
            return initialState;
        }
    }
}

export const GameProvider: React.FC<IComp> = ({ children }) => {
    //@ts-ignore
    const [state, dispatch] = React.useReducer(gameReducer, initialState)

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = React.useContext(GameContext)

    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider')
    }

    return context
}

export async function setTrivia(dispatch: any, trivia: Trivia) {
    dispatch({
        type: GameActionType.SET_TRIVIA,
        payload: trivia
    })
}

export async function setResults(dispatch: any, data) {
    dispatch({
        type: GameActionType.SET_RESULTS,
        payload: data
    })
}

export async function removeTheme(dispatch: any, theme: Subtheme) {
    dispatch({
        type: GameActionType.REMOVE_THEME,
        payload: theme
    })
}

export async function addTheme(dispatch: any, theme: Subtheme) {
    dispatch({
        type: GameActionType.ADD_THEME,
        payload: theme
    })
}

export async function nextQuestion(dispatch: any) {
    dispatch({
        type: GameActionType.NEXT_QUESTION
    })
}

export async function setAnswer(dispatch: any, answer) {
    dispatch({
        type: GameActionType.SET_ANSWER,
        payload: answer
    })
}

interface IConfigsProps {
    level?: string;
    type?: string;
    duration?: number;
}

export async function setConfigs(dispatch: any, configs: IConfigsProps) {
    dispatch({
        type: GameActionType.SET_CONFIGS,
        payload: configs
    })
}

export async function setQuestions(dispatch: any, payload) {
    dispatch({
        type: GameActionType.SET_QUESTIONS,
        payload: payload
    })
}

export async function resetGame(dispatch: any) {
    dispatch({
        type: GameActionType.RESET_GAME
    })
}
