import RecordPagination from '@/components/RecordPagination';
import { getPostsData } from '@/utils/getPost';
import { Suspense } from 'react';

export default function Records() {
    const postsData = getPostsData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RecordPagination postsData={postsData} />
        </Suspense>
    );
}
