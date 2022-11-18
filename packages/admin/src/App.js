import * as React from 'react'
// Layout and theme
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import ProtectedRoute from '@approbado/lib/components/ProtectedRoute';
import Layout from './layouts/Admin'
// Components
import Dashboard from './dashboard'
import Login from './auth/Login'
import Configurations from './configurations/Configurations';
import LevelsCreate from './configurations/LevelsCreate'
import CategoryCreate from './configurations/CategoryCreate'
import CategoryEdit from './configurations/CategoryEdit'
import LevelEdit from './configurations/LevelEdit'
import Profile from './profile'
import UpdateProfilePassword from '@approbado/lib/layouts/UpdatePassword'
import ProfileEdit from './profile/EditProfile'
import Memberships from './memberships/Memberships';
import PlanCreate from './memberships/PlanCreate';
import PlanEdit from './memberships/PlanEdit';
import ResetPassword from './auth/ResetPassword';
import ErrorLayout from '@approbado/lib/layouts/Error'
import UpdatePassword from './auth/UpdatePassword';
import SubthemeCreate from './subthemes/SubthemeCreate'
import SubthemeShow from './subthemes/SubthemeShow';
import SubthemeEdit from './subthemes/SubthemeEdit';
import AwardsCreate from './awards/AwardsCreate'
import FileCreate from './files/FileCreate'
import FileEdit from './files/FileEdit'
import QuestionsCreate from './questions/QuestionCreate'
import UserProfile from '@approbado/lib/layouts/profile/UserProfile'
import QuestionsUpload from './questions/QuestionsUpload'
import BlacklistedUserShow from './blacklistedUsers/BlacklistedUserShow'
import QuestionEdit from './questions/QuestionEdit'
import AwardEdit from './awards/AwardEdit'
import TriviaCreate from './trivias/TriviaCreate';
import TriviaShowLayout from './trivias/TriviaShow';
import TriviaList from './trivias/TriviaList';
import UserListLayout from './users/UserListLayout'
import UserEdit from './users/UserEdit'
import UserCreate from './users/UserCreate'
import ReportsView from './reports/ReportsView'
import ReportShowLayout from './reports/ReportShowLayout'
import NotFound from './layouts/NotFound'
import ForumShow from '@approbado/lib/layouts/forums/ForumShow'
import CommentShow from '@approbado/lib/layouts/comments/CommentShow'
import LevelList from './configurations/LevelsList';
import CategoryList from './configurations/CategoryList';
import PaymentsList from './memberships/PaymentsList';
import PlansList from './memberships/PlansList';
import AdminUsersList from './users/AdminUsersList'
import RegisteredUsersList from './users/RegisteredUsersList'
import RecentReports from './components/RecentReports'
import RestrictedUsers from './restrictedUsers'
import BlacklistedUsers from './blacklistedUsers'
import TriviaEdit from './trivias/TriviaEdit'
import SubthemesList from './subthemes/SubthemesList'
import AwardsList from './awards/AwardsList'
import FilesList from './files/FilesList'
import ForumLayout from './forums'
import QuestionsList from './questions/QuestionsList'
import ForumList from '@approbado/lib/layouts/forums/ForumList';
import Overview from './reports/Overview';
import Analytics from './reports/Analytics';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path='/login'
                    render={() => <Login />}
                />
                <Route
                    exact
                    path="/reset-password"
                    render={() => <ResetPassword />}
                />
                <Route
                    exact
                    path="/update-password"
                    render={() => <UpdatePassword />}
                />

                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/"
                    component={() => <Dashboard />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/reports/users/:id/show"
                    component={() => <BlacklistedUserShow />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/error"
                    component={() => <ErrorLayout />}
                />
                {/**
                 * Account
                 */}
                <Redirect exact from='/profile' to='/profile/about' />
                <ProtectedRoute
                    layout={Profile}
                    exact
                    path="/profile/about"
                    component={() => <ProfileEdit />}
                />
                <ProtectedRoute
                    layout={Profile}
                    exact
                    path="/profile/security"
                    component={() => <UpdateProfilePassword />}
                />

                {/**
                 * Reports
                 */}
                <Redirect exact from='/reports' to='/reports/recent' />
                <ProtectedRoute
                    layout={ReportsView}
                    exact
                    path="/reports/recent"
                    component={() => <RecentReports />}
                />
                <ProtectedRoute
                    layout={ReportsView}
                    exact
                    path="/reports/blacklisted"
                    component={() => <BlacklistedUsers />}
                />
                <ProtectedRoute
                    layout={ReportsView}
                    exact
                    path="/reports/restricted"
                    component={() => <RestrictedUsers />}
                />
                <ProtectedRoute
                    layout={ReportShowLayout}
                    exact
                    path='/reports/:id/overview'
                    component={Overview}
                />
                <ProtectedRoute
                    layout={ReportShowLayout}
                    exact
                    path='/reports/:id/analytics'
                    component={Analytics}
                />

                {/**
                 * Users
                 */}
                <Redirect exact from='/users' to='/users/clients' />
                <ProtectedRoute
                    layout={UserListLayout}
                    exact
                    path="/users/clients"
                    component={() => <RegisteredUsersList />}
                />
                <ProtectedRoute
                    layout={UserListLayout}
                    exact
                    path="/users/admins"
                    component={() => <AdminUsersList />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path='/users/create'
                    component={() => <UserCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/users/:id/show"
                    component={() => <UserProfile />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path='/users/:id'
                    component={() => <UserEdit /> }
                />

                {/**
                 * Plans and memberships
                 */}
                <Redirect exact from='/memberships' to='/memberships/payments' />
                <ProtectedRoute
                    layout={Memberships}
                    exact
                    path="/memberships/payments"
                    component={() => <PaymentsList />}
                />
                <ProtectedRoute
                    layout={Memberships}
                    exact
                    path="/memberships/plans"
                    component={() => <PlansList />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/memberships/plans/create"
                    component={() => <PlanCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/memberships/plans/:id"
                    component={() => <PlanEdit resource="memberships/plans" /> }
                />

                {/**
                 * Settings
                 */}
                <Redirect exact from='/configurations' to='/configurations/categories' />
                <ProtectedRoute
                    layout={Configurations}
                    exact
                    path="/configurations/levels"
                    component={() => <LevelList />}
                />
                <ProtectedRoute
                    layout={Configurations}
                    exact
                    path="/configurations/categories"
                    component={() => <CategoryList />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/configurations/levels/create"
                    component={() => <LevelsCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/configurations/categories/create"
                    component={() => <CategoryCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/configurations/categories/:id"
                    component={() => <CategoryEdit />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/configurations/levels/:id"
                    component={() => <LevelEdit />}
                />

                {/**
                 * Trivias
                 */}
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path='/trivias'
                    component={() => <TriviaList />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/create"
                    component={() => <QuestionsCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/upload"
                    component={() => <QuestionsUpload />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/:question_id"
                    component={() => <QuestionEdit />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path='/trivias/create'
                    component={() => <TriviaCreate />}
                />
                <ProtectedRoute
                    layout={TriviaShowLayout}
                    exact
                    path='/trivias/:trivia_id'
                    component={TriviaEdit}
                />
                <ProtectedRoute
                    layout={TriviaShowLayout}
                    exact
                    path='/trivias/:trivia_id/files'
                    component={FilesList}
                />
                <ProtectedRoute
                    layout={TriviaShowLayout}
                    exact
                    path='/trivias/:trivia_id/questions'
                    component={QuestionsList}
                />
                <ProtectedRoute
                    layout={TriviaShowLayout}
                    exact
                    path='/trivias/:trivia_id/awards'
                    component={AwardsList}
                />
                <ProtectedRoute
                    layout={TriviaShowLayout}
                    exact
                    path='/trivias/:trivia_id/subthemes'
                    component={SubthemesList}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/subthemes/create"
                    component={() => <SubthemeCreate />}
                />
                <ProtectedRoute
                    layout={SubthemeShow}
                    exact
                    path='/trivias/:trivia_id/subthemes/:subtheme_id/questions'
                    component={QuestionsList}
                />
                <ProtectedRoute
                    layout={SubthemeShow}
                    exact
                    path='/trivias/:trivia_id/subthemes/:subtheme_id'
                    component={SubthemeEdit}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/awards/create"
                    component={() => <AwardsCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/files/create"
                    component={() => <FileCreate />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/files/:file_id"
                    component={() => <FileEdit />}
                />
                <ProtectedRoute
                    layout={Layout}
                    exact
                    path="/trivias/:trivia_id/awards/:award_id"
                    component={() => <AwardEdit />}
                />

                {/**
                 * Forum
                 */}
                <Switch>
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
                        layout={Layout}
                    />
                    <ProtectedRoute
                        exact
                        path="/comments/:id/show"
                        component={() => <CommentShow />}
                        layout={Layout}
                    />
                </Switch>
                <Route path='/*' render={() => <NotFound />} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
