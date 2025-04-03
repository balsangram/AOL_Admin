import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';

import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import logo from '../../../public/assets/logo/AOL LOGO BANGALORE ASHRAM BLACK.png';
import YouTubeIcon from '@mui/icons-material/YouTube';

import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { FiBook, FiBox, FiCreditCard, FiDollarSign, FiFileText, FiGift, FiGrid, FiPlusSquare, FiSettings, FiShoppingBag, FiShoppingCart, FiSquare, FiUsers, FiVideo } from 'react-icons/fi';
// import Logo from '../../assets/logo/favicon.ico';

const Sidebar = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div
                    className="bg-white dark:bg-black h-full"
                    style={{
                        backgroundImage: 'linear-gradient(0deg, #D1913C , #FFD194)',
                    }}
                >
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0 justify-center">
                            <img className="w-32 m-auto ml-10 flex-none" src={logo} alt="logo" />
                            {/* <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('Art Of Living')}</span> */}
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center gap-2">
                                                <HomeIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Home')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/create_card" className="group">
                                            <div className="flex items-center gap-2">
                                                <AddCardIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Create Card')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* UserType */}
                                    <li className="nav-item">
                                        <NavLink to="/user_type" className="group">
                                            <div className="flex items-center gap-2">
                                                <PersonIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('User Type')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/create_internal_login" className="group">
                                            <div className="flex items-center gap-2">
                                                <PersonAddAlt1Icon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Create User Type')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/create_user" className="group">
                                            <div className="flex items-center gap-2">
                                                <NoteAddIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Create new action card')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/youtubeLink" className="group">
                                            <div className="flex items-center gap-2">
                                                <YouTubeIcon />
                                                <span className="text-[#56480f]">{t('Add Youtube')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/advertisement_bar" className="group">
                                            <div className="flex items-center gap-2">
                                                <AddPhotoAlternateIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Advertisement')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/popupForm" className="group">
                                            <div className="flex items-center gap-2">
                                                <LocalPostOfficeIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Add Popup')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/addNotification" className="group">
                                            <div className="flex items-center gap-2">
                                                <NotificationsIcon />
                                                {/* <FiGrid className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="text-[#56480f]">{t('Add Notification')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
