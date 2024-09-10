import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className="fixed top-1/2 left-1/2">
            <CgSpinner className="size-12 text-foreground dark:text-light-foreground animate-spin" />
        </div>
    );
}