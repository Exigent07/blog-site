"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Post from '@/components/Post';

export default function CategoryPagination({ postsData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const postsPerPage = 7;
    const router = useRouter();
    const searchParams = useSearchParams();

    const extractCategories = () => {
        const categories = postsData.map(post => post.category);
        return [...new Set(categories)];
    };

    const categories = extractCategories();

    const filteredPosts = selectedCategory
        ? postsData.filter(post => post.category === selectedCategory)
        : postsData;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const categoryParam = searchParams.get('category');

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory(null);
        }

        setCurrentPage(1);

        scrollToTop();
    }, [searchParams]);

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
            <div className="transition-colors duration-300 flex self-center px-[10%] justify-self-center max-w items-center justify-center flex-wrap gap-2 mb-4">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`transition-colors duration-300 px-4 hover:opacity-85 py-2 rounded-sm mx-1 ${selectedCategory === category ? 'bg-foreground text-background dark:bg-light-foreground dark:text-light-background' : 'bg-secondaryAccent dark:bg-light-secondaryAccent opacity-85 text-primaryAccent dark:text-light-primaryAccent'} `}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                            router.push(`/category?category=${category}`);
                        }}
                    >
                        {category}
                    </button>
                ))}
                <button
                    className={`transition-colors duration-300 px-4 hover:opacity-85 py-2 rounded-sm mx-1 ${selectedCategory === null ? 'bg-foreground text-background dark:bg-light-foreground dark:text-light-background' : 'bg-secondaryAccent dark:bg-light-secondaryAccent opacity-85 text-primaryAccent dark:text-light-primaryAccent'} `}
                    onClick={() => {
                        setSelectedCategory(null);
                        setCurrentPage(1);
                        router.push(`/category`);
                    }}
                >
                    All
                </button>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="transition-colors duration-300 text-center mt-8 min-h-[60vh] font-accent text-xl flex items-center justify-center text-foreground dark:text-light-foreground">
                    Can't you see the buttons over there?
                </div>
            ) : (
                <>
                    {currentPosts.map((post, index) => (
                        <Post
                            key={index}
                            title={post.title}
                            date={post.date}
                            category={post.category}
                            ctfName={post.ctf}
                            premise={post.htmlPremise}
                            filename={post.filename}
                        />
                    ))}

                    {totalPages > 1 && (
                        <div className="flex flex-col items-center gap-4 bg-background dark:bg-light-background max-w-max py-12">
                            <div className="flex gap-4">
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
                                        className={`px-4 hover:opacity-85 py-2 rounded-sm mx-1 ${pageNumber === currentPage ? 'bg-foreground text-background dark:bg-light-foreground dark:text-light-background' : 'bg-secondaryAccent dark:bg-light-secondaryAccent opacity-85 text-primaryAccent dark:text-light-primaryAccent'} ${pageNumber === '...' ? 'cursor-default' : ''}`}
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
                                    className="px-4 hover:opacity-85 disabled:cursor-not-allowed w-[6rem] py-2 border-t border-b border-light-border dark:border-light-foreground bg-background dark:bg-light-background text-foreground dark:text-light-foreground disabled:opacity-50"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
