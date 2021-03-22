import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
export const Data = [
    
    {
        title: 'Profile',
        path: '/schooladmin/teachers',
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
        icon: <RiIcons.RiAccountPinCircleFill />,
        cname: 'nav-text'
    },
    {
        title: 'Allergies',
        path: '/schooladmin/sections',
        icon: <AiIcons.AiFillBank />,
        cname: 'nav-text'
    },
    {
        title: 'Additives',
        path: '/schooladmin/students',
        icon: <IoIcons.IoMdPeople />,
        cname: 'nav-text'
    },

    {
        title: 'PDF',
        path: '/schooladmin/Pdf',
        icon: <AiIcons.AiFillFilePdf />,
        cname: 'nav-text'
    }
];
