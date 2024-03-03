import { User, Trivia, Subtheme, Question } from './models';

export interface IGame {
    trivia: Trivia | null;
    themes: [] | Subtheme[];
    level: null | string,
    duration: null | string,
    type: null | string;
    questions: [] | Question[];
    currQuestion: number; // Pregunta actual (Jugando)
    answers: [] | any,
    totalPoints: number;
    correctAnswers: number;
    useTimer: boolean;
}

export type GameContextType = {
    state: IGame,
    dispatch: any
}

export interface IAuth {
    isAuth: boolean;
    token: string | null;
    user: User | null;
    loading: boolean;
}

export type AuthContextType = {
    state: IAuth,
    dispatch: any
}

export interface IToast {
    isOpen: boolean;
    color: string;
    message: string;
}

export type ToastContextType = {
    state: IToast,
    dispatch: any
}
