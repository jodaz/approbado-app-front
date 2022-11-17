import dialogReducer from './dialogReducer';
import triviaReducer from './triviaReducer';
import userReducer from './userReducer';
import schedulesReducer from './schedulesReducer';
import notificationsReducer from './notificationsReducer';
import chatReducer from './chatReducer';
import uiReducer from './uiReducer';
import formAuthReducer from './formAuthReducer';
import forumsReducer from './forumsReducer';

export default {
    user: userReducer,
    dialog: dialogReducer,
    trivia: triviaReducer,
    schedules: schedulesReducer,
    notifications: notificationsReducer,
    chat: chatReducer,
    ui: uiReducer,
    forums: forumsReducer,
    formAuth: formAuthReducer
};
