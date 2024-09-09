"use client"

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();
	return (
        <>
            <main className="flex items-center justify-center flex-col w-full bg-background dark:bg-light-background h-screen">
                <h1 className="text-foreground dark:text-light-foreground font-heading md:text-6xl text-4xl">404, Not Found</h1>
                <p className="mt-2 text-foreground dark:text-light-foreground font-body">Hmm, did you got lost?</p>
                <button 
                    onClick={() => router.push("/")} 
                    className="mt-24 hover:opacity-85 text-foreground dark:text-light-foreground mb-12 md:mb-0 px-6 py-2 border-t border-b border-light-border dark:border-light-foreground text-center self-center font-mono"
                >
                    Home
                </button>
            </main>
        </>
    );
}