import React from 'react'

// Other
import { ACCESS_TOKEN} from '../constants';
import {ARGUMENT, CURRENT_USERNAME, NOTIFICATION_AUTO_CLOSE_MS, PETITION, USER} from "../constants";
import { getCurrentUser } from "../utils/AppUtils";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader";

// Styles
import 'react-toastify/dist/ReactToastify.min.css';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/styles.css';

// Website Components
import AdminControlPanel from "./admin/AdminControlPanel";
import ArgumentAgree from "./argument/create-argument/create-argument-for-argument/ArgumentAgree";
import ArgumentDisagree from "./argument/create-argument/create-argument-for-argument/ArgumentDisagree";
import ArgumentPage from "./argument/ArgumentPage";
import CreatePetition from "./modify-petition/CreatePetition";
import EditArgument from "./argument/EditArgument";
import EditPetition from "./modify-petition/EditPetition";
import Header from './Header';
import Help from "./help/Help";
import Home from "./home/Home";
import Login from "./login/Login";
import ManagePetitions from "./admin/ManagePetitions";
import ManageArguments from "./admin/ManageArguments";
import ManageUsers from "./admin/ManageUsers";
import Petition from "./petition-page/Petition";
import Petitions from "./petitions-page/Petitions";
import PetitionAgree from "./argument/create-argument/create-argument-for-petition/PetitionAgree";
import PetitionDisagree from "./argument/create-argument/create-argument-for-petition/PetitionDisagree";
import Register from "./login/Register";
import Search from "./Search";
import Settings from "./user-pages/Settings";
import UserProfile from "./user-pages/user-profile/UserProfile";
import ArgumentHelp from "./help/argument-help/ArgumentHelp";
import ViewArgumentsHelp from "./help/argument-help/ViewArgumentsHelp";
import CreateArgumentHelp from "./help/argument-help/CreateArgumentHelp";
import EditArgumentHelp from "./help/argument-help/EditArgumentHelp";
import DeleteArgumentHelp from "./help/argument-help/DeleteArgumentHelp";
import AccountHelp from "./help/account-help/AccountHelp";
import LoginHelp from "./help/account-help/LoginHelp";
import CreateAccountHelp from "./help/account-help/CreateAccountHelp";
import DeleteAccountHelp from "./help/account-help/DeleteAccountHelp";
import LogoutHelp from "./help/account-help/LogoutHelp";
import PetitionHelp from "./help/petition-help/PetitionHelp";
import ProfileHelp from "./help/account-help/ProfileHelp";
import ViewPetitionsHelp from "./help/petition-help/ViewPetitionsHelp";
import CreatePetitionsHelp from "./help/petition-help/CreatePetitionHelp";
import DeletePetitionsHelp from "./help/petition-help/DeletePetitionHelp";
import EditPetitionsHelp from "./help/petition-help/EditPetitionHelp";
import SearchPetitionsHelp from "./help/petition-help/SearchPetitionsHelp";
import ClosePetitionHelp from "./help/petition-help/ClosePetitionHelp";

const NOTIFICATION_POSITION = { position: toast.POSITION.BOTTOM_RIGHT };

/**
 * Is the application component that is used to display the views of the system. It also contains all of the different
 * routes that can be accessed.
 */

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            currentUser: null,
            isAuthenticated: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
    }

    // Handles the successful login request.
    handleLogin() {
        const successNotification = () => toast.info("You have successfully logged in.", NOTIFICATION_POSITION);
        this.loadCurrentUser(successNotification);
        (this.props.history.length > 1) ? this.props.history.goBack() : this.props.history.push("/");
    }

    // Handles the successful logout request.
    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(CURRENT_USERNAME);

        if (localStorage.getItem(CURRENT_USERNAME) === null) {
            // Display "logged out" notification
            toast.info("You have successfully been logged out.", NOTIFICATION_POSITION);
            this.props.history.push("/");
            this.setState({ currentUser: null, isAuthenticated: false });

        } else {
            // Display error notification
            toast.error("There has been a problem logging you out.", NOTIFICATION_POSITION);
        }
    }

    // Fetches the current user from the server.
    loadCurrentUser(callback) {
        this.setState({ isLoading: true });
        getCurrentUser()
            .then(response => {
                // Store the user's details.
                this.setState({ currentUser: response, isAuthenticated: true, isLoading: false });
                (callback !== null) && callback();
            }).catch(error => {
                // Stop the loader.
                this.setState({ isLoading: false });
            });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    render() {
        if (this.state.isLoading) {
            // Assumes that data is being fetched, so a loader is displayed.
            return <Loader />
        } else {
            // Assumes that data is now fetched.

            const { currentUser, isAuthenticated } = this.state;
            const { handleLogout, handleLogin } = this;

            return (
                <div>
                    <Header currentUser={currentUser} onLogout={() => handleLogout()} />
                    <ToastContainer autoClose={NOTIFICATION_AUTO_CLOSE_MS} />
                    <main id={"mainContainer"}>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/petitions'
                                   render={(props) => <Petitions {...props} />} />
                            <Route path={`/help/petition/close`} render={(props) => <ClosePetitionHelp />} />
                            <Route path={`/help/petition/search`} render={(props) => <SearchPetitionsHelp />} />
                            <Route path={`/help/petition/edit`} render={(props) => <EditPetitionsHelp />} />
                            <Route path={`/help/petition/delete`} render={(props) => <DeletePetitionsHelp />} />
                            <Route path={`/help/petition/create`} render={(props) => <CreatePetitionsHelp />} />
                            <Route path={`/help/petition/view`} render={(props) => <ViewPetitionsHelp />} />
                            <Route path={`/help/petition/`} render={(props) => <PetitionHelp />} />
                            <Route path={`/help/account/profile`} render={(props) => <ProfileHelp />} />
                            <Route path={`/help/account/logout`} render={(props) => <LogoutHelp />} />
                            <Route path={`/help/account/login`} render={(props) => <LoginHelp />} />
                            <Route path={`/help/account/delete`} render={(props) => <DeleteAccountHelp />} />
                            <Route path={`/help/account/create`} render={(props) => <CreateAccountHelp />} />
                            <Route path={`/help/account/`} render={(props) => <AccountHelp />} />
                            <Route path={`/help/argument/delete`} render={(props) => <DeleteArgumentHelp />} />
                            <Route path={`/help/argument/edit`} render={(props) => <EditArgumentHelp />} />
                            <Route path={`/help/argument/create`} render={(props) => <CreateArgumentHelp />} />
                            <Route path={`/help/argument/view`} render={(props) => <ViewArgumentsHelp />} />
                            <Route path={`/help/argument/`} render={(props) => <ArgumentHelp />}/>
                            <Route path='/help' component={Help} />
                            <Route path='/search' component={Search} />
                            <Route path='/petition/:id/agree'
                                   render={(props) =>
                                       <PetitionAgree isAuthenticated={isAuthenticated} {...props} />
                                   }
                            />
                            <Route path='/petition/:id/disagree'
                                   render={(props) =>
                                       <PetitionDisagree isAuthenticated={isAuthenticated} {...props} />
                                   }
                            />
                            <Route path='/petition/create'
                                   render={(props) =>
                                       <CreatePetition isAuthenticated={isAuthenticated} {...props} />
                                   }
                            />
                            <Route path='/petition/edit/:id'
                                   render={(props) =>
                                       <EditPetition isAuthenticated={isAuthenticated}
                                                     currentUser={currentUser} {...props} />
                                   }
                            />
                            <Route path={`/${PETITION.toLowerCase()}/:id`}
                                   render={(props) => <Petition currentUser={currentUser} {...props} /> } />
                            <Route path='/login'
                                   render={(props) => <Login onLogin={handleLogin} {...props} /> } />
                            <Route path='/register'
                                   render={(props) => <Register {...props} /> } />
                            <Route path='/settings'
                                   render={(props) =>
                                       <Settings isAuthenticated={isAuthenticated}
                                                 currentUser={currentUser} {...props}
                                                 onLogout={handleLogout} />
                                   }
                            />
                            <Route path={`/admin-panel/${USER}s`}
                                   render={(props) =>
                                       <ManageUsers isAuthenticated={isAuthenticated}
                                                    currentUser={currentUser} {...props} />
                                   }
                            />
                            <Route path={`/admin-panel/${ARGUMENT}s`}
                                   render={(props) =>
                                       <ManageArguments isAuthenticated={isAuthenticated}
                                                        currentUser={currentUser} {...props} />
                                   }
                            />
                            <Route path={`/admin-panel/${PETITION}s`}
                                   render={(props) =>
                                       <ManagePetitions isAuthenticated={isAuthenticated}
                                                        currentUser={currentUser} {...props} />
                                   }
                            />
                            <Route path='/admin-panel'
                                   render={(props) =>
                                       <AdminControlPanel isAuthenticated={isAuthenticated}
                                                          currentUser={currentUser} {...props} />
                                   }
                            />
                            <Route path='/user/:username'
                                   render={(props) => <UserProfile currentUser={currentUser} {...props} /> }
                            />
                            <Route path='/argument/:id/agree'
                                   render={(props) => <ArgumentAgree isAuthenticated={isAuthenticated} {...props} />}
                            />
                            <Route path='/argument/:id/disagree'
                                   render={(props) => <ArgumentDisagree isAuthenticated={isAuthenticated} {...props} />}
                            />
                            <Route exact path='/argument/:id'
                                   render={(props) =>
                                       <ArgumentPage key={props.match.params.id} currentUser={currentUser} {...props} />
                                   }
                            />
                            <Route exact path='/argument/edit/:id'
                                   render={(props) =>
                                       <EditArgument isAuthenticated={isAuthenticated}
                                                     currentUser={currentUser} {...props} />
                                   }
                            />
                        </Switch>
                    </main>
                </div>
            );
        }
    }
}

export default withRouter(App);
