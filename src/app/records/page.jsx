import RecordPagination from '@/components/RecordPagination';
import { getPostsData } from '@/utils/getPost';
import { Suspense } from 'react';

export default function Records() {
    const postsData = getPostsData();

    return (
        <main className={`md:pt-[7.5%] pt-[25%] min-h-screen flex-col flex items-center transition-colors duration-300 bg-background text-foreground dark:bg-light-background dark:text-light-foreground`}>
            <Suspense fallback={<div>Loading...</div>}>
                <RecordPagination postsData={postsData} />
            </Suspense>
        </main>
    );
}
