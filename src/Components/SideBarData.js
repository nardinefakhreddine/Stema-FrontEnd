import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as FiIcons from 'react-icons/fi';
export const Data = [
    
    {
        title: 'Profile',
        path: '/profile',
        icon: <IoIcons.IoMdPeople />,
        cname: 'nav-text'
    },
    
    {
        title: 'Products',
        path: '/home',
        icon: <FaIcons.FaProductHunt />,
        cname: 'nav-text'
    },
    {
        title: 'Nutri-Facts',
        path: '/nutri',
        icon: <FiIcons.FiPackage />,
        cname: 'nav-text'
    },
    {
        title: 'Allergies',
        path: '/allergy',
        icon: <FiIcons.FiSunset />,
        cname: 'nav-text'
    },
    {
        title: 'Additives',
        path: '/additive',
        icon: <IoIcons.IoIosAddCircle/>,
        cname: 'nav-text'
    },

    {
        title: 'PDF',
        path: '/pdf',
        icon: <AiIcons.AiFillFilePdf />,
        cname: 'nav-text'
    },
    {
        title: 'Logout',
        path: '',
        icon: <AiIcons.AiOutlineLogout />,
        cname: 'nav-text'
    }
];
