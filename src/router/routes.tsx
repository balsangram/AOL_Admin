// import path from 'path';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
// import CreateCard from '../pages/CreateCard';
import Advertisement from '../pages/Advertisement';
import Update from '../pages/Update';
import UpdateDetails from '../pages/UpdateDetails';
import Events from '../pages/Events';
import Popup from '../pages/Popup';
import CreateUser from '../pages/CreateUser';
import AdvertisementBar from '../pages/Actions';
import Action from '../pages/Actions';
import TypeCard from '../pages/TypeCard';
import CreateInternalLogin from '../pages/CreateInternalLogin';
import UserType from '../pages/UserType';
import CardForm from '../pages/form/CardForm';
import HeadlineForm from '../pages/form/HeadlineForm';
import UserTypeForm from '../pages/form/UserTypeForm';
import ActionForm from '../pages/form/ActionForm';
import YoutubeForm from '../pages/form/YoutubeForm';
import AdvertisementForm from '../pages/form/AdvertisementForm';
import ADVForm from '../pages/form/ADVForm';
import EditForm from '../pages/form/EditForm';
import ActionEditForm from '../pages/form/ActionEditForm';
import PopupForm from '../pages/form/PopupForm';
import AddNotification from '../pages/form/AddNotification';
// import ActionForm from '../pages/form/ActionForm';
// import CreateInternalLogin from '../pages/CreateInternalLogin';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));

const routes = [
    {
        path: '/',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Home />
            </Suspense>
        ),
        layout: 'default', // Ensure this is actually used somewhere
    },
    {
        path: '/create_card',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {/* <CreateCard /> */}
                <CardForm />
            </Suspense>
        ),
    },
    {
        path: '/edit_card',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <EditForm />
            </Suspense>
        ),
    },
    {
        path: '/action_edit_card',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <ActionEditForm />
            </Suspense>
        ),
    },

    {
        path: '/createHeadline',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {/* <CreateCard /> */}
                <HeadlineForm />
            </Suspense>
        ),
    },
    {
        path: '/advertisement_bar',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {/* <Advertisement /> */}
                <ADVForm />
            </Suspense>
        ),
    },
    {
        path: '/create_user',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {/* <CreateUser /> */}
                <ActionForm />
            </Suspense>
        ),
    },
    {
        path: '/user_type',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <UserType />
            </Suspense>
        ),
    },
    {
        path: '/events',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Events />
            </Suspense>
        ),
    },
    {
        path: '/create_internal_login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                {/* <CreateInternalLogin /> */}
                <UserTypeForm />
            </Suspense>
        ),
    },
    {
        path: '/popup',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Popup />
            </Suspense>
        ),
    },
    {
        path: '/addNotification',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <AddNotification />
            </Suspense>
        ),
    },

    {
        path: '/signin',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: '/update/:id',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Update />
            </Suspense>
        ),
    },
    {
        path: '/update-details/:id',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <UpdateDetails />
            </Suspense>
        ),
    },

    {
        path: '/youtubeLink',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <YoutubeForm />
            </Suspense>
        ),
    },
    {
        path: '/popupForm',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <PopupForm />
            </Suspense>
        ),
    },
    {
        path: '/action',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Action />
            </Suspense>
        ),
    },
    {
        path: '/typecard',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <TypeCard />
            </Suspense>
        ),
    },
    {
        path: '/typeaction2',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <TypeCard />
            </Suspense>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" />, // Redirect unknown routes to Home
    },
];

export { routes };
