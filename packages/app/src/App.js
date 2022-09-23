import * as React from 'react'
// Other resources
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '@approbado/lib/components/ProtectedRoute';
import { useMediaQuery } from '@material-ui/core'

// Layouts
import DefaultLayout from './layouts/Default'
import GameLayout from './layouts/Game'
import ChatLayout from './layouts/Chat'
import DashboardLayout from './layouts/Dashboard'
import ForumLayout from './layouts/Forum'
import SettingsLayout from './layouts/Settings'
import ProfileEditLayout from './layouts/EditProfile'

// Views
import NotificationsView from './notifications'
import TriviaList from './trivias/TriviaList'
import TriviaGame from './trivias/games'
import PreparingRoom from './trivias/games/PreparingRoom'
import StartTrivia from './trivias/startTrivia'
import ErrorLayout from '@approbado/lib/layouts/Error'
import UserProfile from '@approbado/lib/layouts/profile/UserProfile'
import TestList from './tests'
import UserRanking from './ranking'
import CompletedGames from './completedGames'
import ScheduleCreate from './schedule/ScheduleCreate'
import Authenticate from '@approbado/lib/layouts/Authenticate'
import Profile from './profile';
import ForumShow from '@approbado/lib/layouts/forums/ForumShow'
import ForumEdit from '@approbado/lib/layouts/forums/ForumEdit'
import CommentShow from '@approbado/lib/layouts/comments/CommentShow'
import SelectMessageAlert from './layouts/Chat/SelectMessageAlert'
import Chatbox from './chatbox'
import ForumList from '@approbado/lib/layouts/forums/ForumList';
import PrivacySettings from './privacy';
import ScheduleNavbar from './layouts/Dashboard/aside';
import DeleteAccount from './deleteAccount'
import NotificationSettings from './notificationSettings'
import UpdatePassword from '@approbado/lib/layouts/UpdatePassword'
import ScheduleEdit from './schedule/ScheduleEdit';
import UserPlan from './userPlan';
import SessionEdit from './sessionsEdit'
import AboutForm from './aboutForm'
import AboutMe from '@approbado/lib/layouts/profile/AboutMe'
import Certifications from '@approbado/lib/layouts/profile/Certifications'
import Publications from '@approbado/lib/layouts/profile/Publications'
import AsideChatList from './layouts/Chat/AsideChatList'
// Utils
import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LazyLoader from '@approbado/lib/components/LazyLoader'
import ResetPassword from './components/ResetPassword'
// Frames
const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'))
const PlansList = React.lazy(() => import('./components/PlansList'))

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "dd-MM-yyyy", { locale: this.locale });
    }
}

const App = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )

    return (
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={esLocale}>
            <Route path='/auth' render={() => <Authenticate />} />
            <Route exact path='/login'>
                <LazyLoader loader={true}>
                    <Login />
                </LazyLoader>
            </Route>
            <Route path='/register'>
                <LazyLoader loader={true}>
                    <Register />
                </LazyLoader>
            </Route>
            <Route path='/reset-password'>
                <ResetPassword />
            </Route>
            <Route path='/update-password'>
                <UpdatePassword />
            </Route>
            <LazyLoader loader={true}>
                <Route path='/plans' render={() => <PlansList />} />
            </LazyLoader>

            <Switch>
                {/**
                 * Dashboard
                 */}
                <Redirect exact from='/' to='/dashboard' />
                <ProtectedRoute
                    exact
                    path="/dashboard"
                    component={() => <TestList />}
                    layout={DashboardLayout}
                />
                <ProtectedRoute
                    exact
                    path="/dashboard/schedules"
                    component={() => <ScheduleCreate />}
                    layout={DashboardLayout}
                />
                <ProtectedRoute
                    exact
                    path="/dashboard/schedules/:id"
                    component={() => <ScheduleEdit />}
                    layout={DashboardLayout}
                />
                <ProtectedRoute
                    exact
                    path="/dashboard/ranking"
                    component={() => <UserRanking />}
                    layout={DashboardLayout}
                />
                <ProtectedRoute
                    exact
                    path="/dashboard/completed"
                    component={() => <CompletedGames />}
                    layout={DashboardLayout}
                />

                {/**
                 * Account
                 */}
                <Redirect exact from='/settings' to='/settings/privacy' />
                <ProtectedRoute
                    exact
                    path="/settings/privacy"
                    component={() => <PrivacySettings />}
                    layout={SettingsLayout}
                />
                <ProtectedRoute
                    exact
                    path="/settings/notifications"
                    component={() => <NotificationSettings />}
                    layout={SettingsLayout}
                />
                <ProtectedRoute
                    exact
                    path="/settings/delete-account"
                    component={() => <DeleteAccount />}
                    layout={SettingsLayout}
                />
                <ProtectedRoute
                    exact
                    path="/settings/security"
                    component={() => <UpdatePassword />}
                    layout={SettingsLayout}
                />

                {/**
                 * Profile edit
                 */}
                <ProtectedRoute
                    exact
                    path="/profile/edit"
                    component={() => <AboutForm />}
                    layout={ProfileEditLayout}
                />
                <ProtectedRoute
                    exact
                    path="/profile/sessions"
                    component={() => <SessionEdit />}
                    layout={ProfileEditLayout}
                />
                <ProtectedRoute
                    exact
                    path="/profile/plans"
                    component={() => <UserPlan />}
                    layout={ProfileEditLayout}
                />
                <ProtectedRoute
                    exact
                    path="/profile"
                    component={() => <Profile />}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/error"
                    component={() => <ErrorLayout />}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/notifications"
                    component={() => <NotificationsView />}
                    layout={DefaultLayout}
                />
                {/**
                 * Users
                 */}
                <Redirect exact from='/users/:id' to='/users/:id/about' />
                <ProtectedRoute
                    exact
                    path="/users/:id/about"
                    component={() => (
                        <UserProfile>
                            <AboutMe />
                        </UserProfile>
                    )}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/users/:id/about"
                    component={() => (
                        <UserProfile>
                            <AboutMe />
                        </UserProfile>
                    )}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/users/:id/certifications"
                    component={() => (
                        <UserProfile>
                            <Certifications />
                        </UserProfile>
                    )}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/users/:id/publications"
                    component={() => (
                        <UserProfile>
                            <Publications />
                        </UserProfile>
                    )}
                    layout={DefaultLayout}
                />

                {/**
                 * Forum
                 */}
                <Redirect exact from='/forums' to='/forums/top' />
                <ProtectedRoute
                    exact
                    path="/forums/top"
                    component={() => <ForumList sort={{ field: 'comments', order: 'DESC' }} />}
                    layout={ForumLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/new"
                    component={() => <ForumList sort={{ field: 'created_at', order: 'DESC' }} />}
                    layout={ForumLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/unanswered"
                    component={() => <ForumList filter={{ unanswered: true }} />}
                    layout={ForumLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/:id"
                    component={() => <ForumShow  />}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/:id/edit"
                    component={() => <ForumEdit />}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/comments/:id"
                    component={() => <CommentShow />}
                    layout={DefaultLayout}
                />

                {/**
                 * Trivias
                 */}
                <ProtectedRoute
                    layout={DefaultLayout}
                    exact
                    path='/trivias'
                    component={() => <TriviaList />}
                />
                <ProtectedRoute exact path="/trivias/start" component={() => <StartTrivia />} layout={DefaultLayout} />
            </Switch>

            {/**
             * Game
             */}
            <Switch>
                <ProtectedRoute exact path="/game" component={() => <TriviaGame />} layout={GameLayout} />
                <ProtectedRoute exact path="/room/:token" component={() => <PreparingRoom />} layout={GameLayout} />
            </Switch>

            <Switch>
                {/**
                 * Chats
                 */}
                <ProtectedRoute
                    exact
                    path="/chats"
                    component={() => (
                        <>
                            <AsideChatList />
                            {!isSmall && <SelectMessageAlert />}
                        </>
                    )}
                    layout={ChatLayout}
                />
                <ProtectedRoute
                    exact
                    path="/chats/:chat_id"
                    component={() => (
                        <>
                            {!isSmall && <AsideChatList />}
                            <Chatbox />
                        </>
                    )}
                    layout={ChatLayout}
                />
            </Switch>

            {/**
             * Responsive routes
             */}
            {isSmall ? (
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/schedules"
                        component={() => <ScheduleNavbar />}
                        layout={DefaultLayout}
                    />
                    <Redirect from='/schedules' to='/schedules' />
                </Switch>
            ) : (
                <Switch>
                    <Redirect from='/schedules' to='/dashboard/schedules' />
                </Switch>
            )}
        </MuiPickersUtilsProvider>
    )
}

export default App;
