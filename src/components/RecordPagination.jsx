"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Post from '@/components/Post';

export default function RecordPagination({ postsData }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedYear, setSelectedYear] = useState(null);
    const [invalidYear, setInvalidYear] = useState(false);
    const postsPerPage = 7;
    const router = useRouter();
    const searchParams = useSearchParams();

    const extractYears = () => {
        const years = postsData.map(post => new Date(post.date).getFullYear());
        return [...new Set(years)];
    };

    const years = extractYears();

    const filteredPosts = selectedYear && !invalidYear
        ? postsData.filter(post => new Date(post.date).getFullYear() === selectedYear)
        : postsData;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const yearParam = searchParams.get('year');

        if (yearParam && !isNaN(yearParam)) {
            const year = Number(yearParam);
            if (years.includes(year)) {
                setSelectedYear(year);
                setInvalidYear(false);
            } else {
                setInvalidYear(true);
            }
            setCurrentPage(1);
        } else {
            setSelectedYear(null);
            setInvalidYear(false);
        }
    }, [searchParams, years]);

    useEffect(() => {
        scrollToTop();
    }, [currentPage, selectedYear]);

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
                
                <div className="w-full flex flex-wrap justify-center gap-2 mb-4">
                    {years.map(year => (
                        <button
                            key={year}
                            className={`px-4 hover:opacity-85 py-2 rounded-sm mx-1 ${selectedYear === year ? 'bg-foreground text-background dark:bg-light-foreground dark:text-light-background' : 'bg-secondaryAccent dark:bg-light-secondaryAccent opacity-85 text-primaryAccent dark:text-light-primaryAccent'} `}
                            onClick={() => {
                                setSelectedYear(year);
                                setCurrentPage(1);
                                setInvalidYear(false);
                                router.push(`/records?year=${year}`);
                            }}
                        >
                            {year}
                        </button>
                    ))}
                    <button
                        className={`px-4 hover:opacity-85 py-2 rounded-sm mx-1 ${selectedYear === null ? 'bg-foreground text-background dark:bg-light-foreground dark:text-light-background' : 'bg-secondaryAccent dark:bg-light-secondaryAccent opacity-85 text-primaryAccent dark:text-light-primaryAccent'} `}
                        onClick={() => {
                            setSelectedYear(null);
                            setCurrentPage(1);
                            setInvalidYear(false);
                            router.push(`/records`);
                        }}
                    >
                        All
                    </button>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    {invalidYear ? (
                        <div className="text-center mt-8 min-h-[60vh] font-accent text-xl flex items-center justify-center text-foreground dark:text-light-foreground">
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
                                            className="px-4 disabled:cursor-not-allowed w-[6rem] py-2 border-t border-b border-light-border dark:border-light-foreground bg-background dark:bg-light-background hover:opacity-85 text-foreground dark:text-light-foreground disabled:opacity-50"
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
                </Suspense>
            </main>
        </>
    );
}
