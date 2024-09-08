"use client";

import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/python';
import 'highlight.js/lib/languages/java';
import 'highlight.js/lib/languages/xml';
import 'highlight.js/lib/languages/css';
import 'highlight.js/lib/languages/bash';
import 'highlight.js/lib/languages/php';
import 'highlight.js/lib/languages/ruby';
import 'highlight.js/lib/languages/sql';
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from "react-icons/io"
import { useRouter } from 'next/navigation';

export default function FullPost({ postData }) {
    const [expanded, setExpanded] = useState({});
    const router = useRouter();

    const handleScroll = (slug) => {
        const element = document.getElementById(slug);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const toggleExpand = (index) => {
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    useEffect(() => {
        hljs.highlightAll();

        const blocks = document.querySelectorAll('pre');
        blocks.forEach(block => {
            const existingButton = block.querySelector('.copy-button');
            if (existingButton) {
                existingButton.remove();
            }

            const codeElement = block.querySelector('code');
            if (codeElement) {
                const language = codeElement.className.replace('language-', '').split(" ")[0];
                block.dataset.language = language.charAt(0).toUpperCase() + language.slice(1);

                const button = document.createElement('button');
                button.className = 'copy-button';
                button.textContent = 'Copy';
                button.addEventListener('click', () => {
                    const code = codeElement.textContent;
                    navigator.clipboard.writeText(code).then(() => {
                        button.textContent = 'Copied!';
                        setTimeout(() => button.textContent = 'Copy', 2000);
                    });
                });
                block.appendChild(button);
            }
        });
    }, [expanded, postData]);

    return (
        <section className="relative flex flex-col gap-4 items-start w-full max-w-4xl px-4 md:px-10 py-6 md:py-10 text-left">
            <h2 className="text-3xl md:text-6xl font-heading text-center md:text-left">{postData.title}</h2>
            <div className="flex flex-col md:flex-row font-accent items-left gap-4 md:gap-5 justify-center text-sm">
            <p className="hover:underline hover:opacity-85 cursor-pointer" onClick={() => router.push(`/records?year=${new Date(postData.date).getFullYear()}`)}>{postData.date}</p>
            <p className="hover:underline hover:opacity-85 cursor-pointer" onClick={() => router.push(`/category?category=${postData.category}`)}>{postData.category}</p>
                <p>{postData.ctf}</p>
            </div>
            <div id="premise" className="font-body relative mb-10" dangerouslySetInnerHTML={{ __html: postData.htmlPremise }} />
            
            <div className="p-8 flex flex-col items-center justify-center w-full">
                <h2 className="text-2xl md:text-4xl mb-5 font-accent text-center md:text-left">Table Of Contents</h2>
                {postData.toc.map((data, index) => {
                    const slug = data.headingText.replace(/\s+/g, '-').toLowerCase();
                    const hasChildren = data.children && data.children.length > 0;

                    return (
                        <div className="border font-body w-1/2 p-2" key={index}>
                            <div className="flex items-center justify-between">
                                <button
                                    className="text-primaryAccent dark:text-light-primaryAccent hover:underline"
                                    onClick={() => handleScroll(slug)}
                                >
                                    <h4>{data.headingText}</h4>
                                </button>
                                {hasChildren && (
                                    <button onClick={() => toggleExpand(index)}>
                                        {expanded[index] ? <IoMdArrowDropdownCircle className="text-xl"  /> : <IoMdArrowDroprightCircle className="text-xl" />}
                                    </button>
                                )}
                            </div>
                            {hasChildren && expanded[index] && (
                                <div className="ml-4 mt-2">
                                    {data.children.map((child, childIndex) => {
                                        const childSlug = child.headingText.replace(/\s+/g, '-').toLowerCase();
                                        return (
                                            <div key={childIndex}>
                                                <p
                                                    className=""
                                                >
                                                    <h5>{child.headingText}</h5>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div id="postContent" className="font-body" dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
        </section>
    );
}
