"use client"

import React, { useEffect, useState, useRef } from 'react';
import { FaSun, FaMoon, FaTwitter, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import clsx from 'clsx';

export default function Nav() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);
    const hamburgerRef = useRef(null);

    const handleRouting = (path) => {
        router.push(path);
    };

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            const isDarkMode = savedMode === 'true' ? true : false;
            document.documentElement.classList.toggle('dark', isDarkMode);
            setIsDarkMode(isDarkMode);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            document.documentElement.classList.toggle('dark', newMode);
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };    

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
            <nav className="z-10 shadow-lg transition-colors duration-300 fixed w-full h-16 flex custom-shadow items-center justify-center bg-background dark:bg-light-background">
                <div id="navContents" className="flex items-center justify-between h-full w-fix bg-transparent">
                    <div className="ml-4 flex gap-12 items-center justify-evenly">
                        <h2 onClick={() => handleRouting("/")} id="logo" className="transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight font-heading text-3xl font-bold text-foreground dark:text-light-foreground">Exigent</h2>
                        <h4 onClick={() => handleRouting("/records")} className="transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight mt-2 font-accent text-base text-foreground dark:text-light-foreground hidden md:block">Records</h4>
                        <h4 onClick={() => handleRouting("/category")} className="transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight mt-2 font-accent text-base text-foreground dark:text-light-foreground hidden md:block">Category</h4>
                        <h4 onClick={() => handleRouting("/about")} className="transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight mt-2 font-accent text-base text-foreground dark:text-light-foreground hidden md:block">About</h4>
                    </div>
                    <div className="mr-4 flex gap-12 items-center justify-evenly">
                        <Link href="https://github.com/exigent07/" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-foreground hover:opacity-85 mt-2 dark:text-light-foreground text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-highlight dark:hover:text-light-highlight hidden md:block" /> 
                        </Link>
                        <Link href="https://x.com/Exigent07" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-foreground hover:opacity-85 mt-2 dark:text-light-foreground text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-highlight dark:hover:text-light-highlight hidden md:block" /> 
                        </Link>
                        {!isDarkMode 
                            ? (
                            <FaSun 
                                onClick={toggleDarkMode} 
                                className="text-foreground hover:opacity-85 mt-2 text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-highlight hover:rotate-90 hidden md:block" 
                            />
                            ) : (
                            <FaMoon 
                                onClick={toggleDarkMode} 
                                className="text-light-foreground hover:opacity-85 mt-2 text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-light-highlight hidden md:block" 
                            />
                            )
                        }
                    </div>
                    <div
                        id="ham"
                        ref={hamburgerRef}
                        className="md:hidden text-center mr-4 mt-2 transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight font-heading text-3xl font-bold text-foreground dark:text-light-foreground"
                        onClick={toggleDropdown}
                    >
                        &#9776;
                    </div>
                </div>

                <div 
                    ref={dropdownRef} 
                    className={clsx(
                        'flex items-center justify-center flex-col absolute top-16 left-0 w-full bg-background dark:bg-light-background border-b border-gray-300 dark:border-gray-700 md:hidden transition-transform duration-500', // Ensure transition-transform is included
                        isDropdownOpen ? 'dropdown-enter-active' : 'dropdown-exit-active'
                    )}
                >
                    {isDropdownOpen && (
                        <div className="flex flex-col items-center py-4">
                            <h4 onClick={() => handleRouting("/records")} className="m-2 transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight font-accent text-base text-foreground dark:text-light-foreground mb-2">Records</h4>
                            <h4 onClick={() => handleRouting("/category")} className="m-2 transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight font-accent text-base text-foreground dark:text-light-foreground mb-2">Category</h4>
                            <h4 onClick={() => handleRouting("/about")} className="m-2 transition-colors hover:opacity-85 ease-in-out duration-200 cursor-pointer select-none hover:text-highlight dark:hover:text-light-highlight font-accent text-base text-foreground dark:text-light-foreground">About</h4>
                        </div>
                    )}
                    {isDropdownOpen && (
                        <div className="mr-4 mb-4 w-1/2 flex gap-12 items-center justify-evenly">
                            <Link href="https://github.com/exigent07/" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-foreground hover:opacity-85 dark:text-light-foreground text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-highlight dark:hover:text-light-highlight md:hidden" /> 
                            </Link>
                            <Link href="https://x.com/Exigent07" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-foreground hover:opacity-85 dark:text-light-foreground text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-highlight dark:hover:text-light-highlight md:hidden" /> 
                            </Link>
                            {!isDarkMode 
                                ? (
                                <FaSun 
                                    onClick={toggleDarkMode} 
                                    className="text-foreground hover:opacity-85 text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-highlight hover:rotate-90 md:hidden" 
                                />
                                ) : (
                                <FaMoon 
                                    onClick={toggleDarkMode} 
                                    className="text-light-foreground hover:opacity-85 text-lg scale-100 cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 hover:text-light-highlight md:hidden" 
                                />
                                )
                            }
                        </div>
                    )}
                </div>
            </nav>
    );
}
