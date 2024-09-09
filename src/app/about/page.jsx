"use client"

import { useRouter } from "next/navigation";

export default function About() {
    const router = useRouter();

    return (
        <main className="md:pt-[8.5%] text-center md:text-left pt-[25%] min-h-screen flex flex-col items-center transition-colors duration-300 bg-background text-foreground dark:bg-light-background dark:text-light-foreground">
            <h1 className="text-6xl font-heading mb-8">
                About Me
            </h1>
            <p className="font-body text-xl max-w pt-8 px-4">
                Hi, I&apos;m Aravindh a Cyber Security student from India with a big interest in Web Security. I enjoy learning about how websites work and how to keep them safe. My goal is to find and fix security problems to help protect the internet.
            </p>
            <p className="font-body text-xl max-w pt-8 px-4">
                In my free time, I also like to do web development and build websites. If you want to check out some of my work, feel free to visit <span onClick={() => window.open("https://exigent-app.vercel.app/")} className="underline hover:opacity-85 cursor-pointer">my portfolio</span>.
            </p>
            <p className="font-body text-xl max-w pt-8 px-4">
                I often share CTF writeups and other interesting topics on this blog. I also play Capture The Flag (CTF) with <span onClick={() => window.open("https://bi0s.in")} className="underline hover:opacity-85 cursor-pointer">team bi0s</span>.
            </p>
            <p className="text-xl font-body max-w pt-8 px-4">
                I'm quite active on <span onClick={() => window.open("https://x.com/Exigent07")} className="underline hover:opacity-85 cursor-pointer">X/Twitter</span>, so feel free to reach out. If you're interested in my work or collaborations, you can also check out my <span onClick={() => window.open("https://github.com/exigent07")} className="underline hover:opacity-85 cursor-pointer">GitHub</span> for coding project.
            </p>
            <button 
                onClick={() => router.push("/")} 
                className="mt-24 hover:opacity-85 mb-12 md:mb-0 px-6 py-2 border-t border-b border-light-border dark:border-light-foreground text-center self-center font-mono"
            >
                Start Reading
            </button>
        </main>
    );
}
