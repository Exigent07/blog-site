import CategoryPagination from '@/components/CategoryPagination';
import { getPostsData } from '@/utils/getPost';

export default function Records() {
    const postsData = getPostsData();

    return (
        <CategoryPagination postsData={postsData} />
    );
}
