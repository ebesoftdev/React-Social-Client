import { Switch, Route, Redirect } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from '../features/login/authSlice';
import { clear as clearPosts } from '../features/post/postSlice';
import { setProfile } from '../features/profile/profileSlice';
import { updateUser } from '../features/login/userSlice';
import { setGroup } from '../features/group/groupSlice';
import { clearNotifications } from '../features/notification/notificationSlice';

// components
import ProfilePage from "../features/profile/ProfilePage";
import ResetPassword from "../features/profile/ResetPassword";
import EditProfilePage from "../features/profile/EditProfilePage";
import CreateGroupPage from "../features/group/CreateGroupPage";
import GroupPage from "../features/group/GroupPage";
import EditGroupPage from "../features/group/EditGroupPage"
import Discover from "../features/discover/Discover";
import FollowingFeed from "../features/feed/FollowingFeed";
import Feed from "../features/feed/Feed";
import Register from "../features/register/Register";
import Login from "../features/login/Login";
import Landing from "../features/landing/Landing";
import BookmarkedPosts from "../features/bookmark/BookmarkedPosts";
import AllFollowers from "../features/profile/AllFollowers"
import AllFollowings from "../features/profile/AllFollowings"

interface MainRouterProps{
  loggedIn:string
}

const MainRouter= ({loggedIn}: MainRouterProps) => {
  const dispatch = useAppDispatch();

  // Logout now dispatching to store to update state
  const doLogout = () => {
    dispatch(logout());
    dispatch(clearPosts());
    dispatch(setProfile({}));
    dispatch(updateUser({id: '', email: ''}));
    dispatch(setGroup({}));
    dispatch(clearNotifications());
  }

  // Login is now handled in the Login page component.

  if (loggedIn) {
    return (
      <div id="container-to-remove">
        <Switch>
          <Redirect from="/user_profile/:id" to='/profile/:id'/>
          <Route path="/profile/:id">
            <ProfilePage beep={false} />
          </Route>
          <Route path="/profile">
            <ProfilePage beep={true} />
          </Route>
          <Route path="/followers">
            <AllFollowers />
          </Route>
          <Route path="/followings">
            <AllFollowings />
          </Route>
          <Route path="/editProfile">
            <EditProfilePage />
          </Route>
          <Route path="/resetPassword">
            <ResetPassword/>
          </Route>
          <Route path="/createGroup">
            <CreateGroupPage />
          </Route>
          <Route path="/group/:groupName">
            <GroupPage />
          </Route>
          <Route path="/editGroup/:groupName">
            <EditGroupPage />
          </Route>
          <Route path="/logout">
            {doLogout}
          </Route>
          <Route path="/feed/following">
            <FollowingFeed />
          </Route>
          <Route path="/feed">
            <Feed isGroup={false}/>
          </Route>
          <Route path="/bookmarks">
            <BookmarkedPosts isGroup={false} />
          </Route>
          <Route path="/discover">
            <Discover isGroup={false}/>
          </Route>
        </Switch>
      </div> )
  }
  else {
    return (
      <div>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div> )
  }
}

export default MainRouter
