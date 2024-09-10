"use client";

import { useState, useEffect } from "react";
import Post from '@/components/Post';
import { IoIosSearch } from "react-icons/io";

export default function Pagination({ postsData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const postsPerPage = 7;
    
    const filteredPosts = searchQuery
        ? postsData.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.ctf.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.htmlPremise.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          )
        : postsData;
    
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToTop();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const generatePageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <>
            <main className={`md:pt-[7.5%] pt-[25%] min-h-screen flex-col flex items-center transition-colors duration-300 bg-background text-foreground dark:bg-light-background dark:text-light-foreground`}>
                <div className="relative mb-4 w-[95%] md:w-2/6">
                    <input
                        type="text"
                        className="hover:opacity-85 font-accent px-4 py-2 w-full border-t border-b border-light-border dark:border-light-foreground outline-none active:outline-none bg-transparent dark:text-dark-foreground"
                        placeholder="Search by title, CTF or content..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <IoIosSearch className="cursor-pointer absolute text-foreground dark:text-light-foreground right-2 top-1/2 transform -translate-y-1/2 text-2xl" />
                </div>

                {currentPosts.length > 0 ? (
                    currentPosts.map((post, index) => (
                        <Post
                            key={index}
                            title={post.title}
                            date={post.date}
                            category={post.category}
                            ctfName={post.ctf}
                            premise={post.htmlPremise}
                            filename={post.filename}
                        />
                    ))
                ) : (
                    <p>No posts found</p>
                )}
                
                <div className="flex transition-colors duration-300 flex-col items-center gap-4 bg-background dark:bg-light-background max-w-max py-12">
                    <div className="flex gap-4 transition-colors duration-300">
                        <button
                            className="px-4 hover:opacity-85 py-2 disabled:cursor-not-allowed w-[6rem] border-t border-b border-light-border dark:border-light-foreground bg-background dark:bg-light-background text-foreground dark:text-light-foreground disabled:opacity-50"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {generatePageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                className={`px-4 hover:opacity-85 transition-colors duration-300 py-2 rounded-sm mx-1 ${pageNumber === currentPage ? 'bg-foreground text-background dark:bg-light-foreground dark:text-light-background' : 'bg-secondaryAccent dark:bg-light-secondaryAccent opacity-85 text-primaryAccent dark:text-light-primaryAccent'} ${pageNumber === '...' ? 'cursor-default' : ''}`}
                                onClick={() => {
                                    if (pageNumber !== '...') {
                                        handlePageChange(pageNumber);
                                    }
                                }}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            className="px-4 transition-colors duration-300 hover:opacity-85 disabled:cursor-not-allowed w-[6rem] py-2 border-t border-b border-light-border dark:border-light-foreground bg-background dark:bg-light-background text-foreground dark:text-light-foreground disabled:opacity-50"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
