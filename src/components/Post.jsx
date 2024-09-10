"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Post({ title, date, category, ctfName, premise, filename }) {
    const [currentTheme, setCurrentTheme] = useState("false");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('darkMode');
            if (storedTheme) {
                setCurrentTheme(storedTheme);
            }
        }
    }, []);

    return (
        <section className="max-w transition-colors duration-300 relative flex flex-col gap-4 p-6 md:p-10 text-left bg-background dark:bg-light-background">
            <style jsx>{`
                section::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(to right, transparent, ${currentTheme === 'false' ? "#7c7c7c" : "#5a5a5a"}, transparent);
                    pointer-events: none;
                }
            `}</style>
            <h2 className="text-2xl md:text-4xl font-heading text-center md:text-left">{title}</h2>
            <div className="flex self-center md:self-start flex-col md:flex-row font-accent items-center gap-4 md:gap-5 justify-center text-sm">
                <p className="hover:underline hover:opacity-85 cursor-pointer" onClick={() => router.push(`/records?year=${new Date(date).getFullYear()}`)}>{date}</p>
                <p className="hover:underline hover:opacity-85 cursor-pointer" onClick={() => router.push(`/category?category=${category}`)}>{category}</p>
                <p>{ctfName}</p>
            </div>
            <div className="font-body mt-4 md:text-left text-center" dangerouslySetInnerHTML={{ __html: premise }} />
            <button 
                onClick={() => window.open(`/posts/${filename}`)} 
                className="mt-4 px-6 py-2 hover:opacity-85 border-t border-b border-light-border dark:border-light-foreground text-center self-center font-mono"
            >
                Read More
            </button>
        </section>
    );
}
