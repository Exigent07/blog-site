import Next from "../svg/next.svg";
import Tailwind from "../svg/tailwind.svg";

export default function Footer() {
    return (
        <footer className="h-[15vh] select-none w-full flex items-center justify-center bg-background dark:bg-light-background">
            <div className="flex transition-colors duration-300 flex-col md:flex-row w-full max-w-4xl items-center justify-between px-6 md:px-10 text-center md:text-left">
                <p className="text-foreground text-sm dark:text-light-foreground font-accent mb-4 md:mb-0">
                    All Rights Reserved ©2024 Exigent
                </p>
                <p className="text-foreground text-sm dark:text-light-foreground font-accent flex items-center justify-center">
                    Built with{" "}
                    <span className="ml-2 mr-2">
                        <Next className="w-5 h-5 fill-foreground dark:fill-light-foreground" />
                    </span>
                    Next.js and{" "}
                    <span className="ml-1 mr-1">
                        <Tailwind className="w-6 h-6 fill-foreground dark:fill-light-foreground" />
                    </span>
                    Tailwind CSS
                </p>
            </div>
        </footer>
    );
}
