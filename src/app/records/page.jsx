import RecordPagination from '@/components/RecordPagination';
import { getPostsData } from '@/utils/getPost';

export default function Records() {
    const postsData = getPostsData();

    return (
        <RecordPagination postsData={postsData} />
    );
}
