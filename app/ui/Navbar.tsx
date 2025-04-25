import React from 'react';
import {
    UserCircleIcon,
    UserGroupIcon,
    CubeIcon,
} from '@heroicons/react/24/outline';
import './navbar.css';


const links = [
    { name: 'Friend', href: '/friends', icon: UserGroupIcon },
    {
        name: 'Game',
        href: '/game',
        icon: CubeIcon,
    },
    { name: 'login', href: '/loginPage', icon: UserCircleIcon },
];

export default function Navbar() {
    return (
        <nav className='navbar'>
            {
                links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <a
                            key={link.name}
                            href={link.href}
                        >
                            <LinkIcon className="w-6" />
                            <p >{link.name}</p>
                        </a>
                    );
                })
            }
        </nav>
    );
}
