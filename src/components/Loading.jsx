import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className="fixed flex items-center justify-center z-0 top-0 left-0 h-screen w-full">
            <CgSpinner className="size-12 text-foreground dark:text-light-foreground animate-spin" />
        </div>
    );
}