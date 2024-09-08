import CategoryPagination from '@/components/CategoryPagination';
import { getPostsData } from '@/utils/getPost';
import { Suspense } from "react";

export default function Records() {
    const postsData = getPostsData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CategoryPagination postsData={postsData} />
        </Suspense>
    );
}
