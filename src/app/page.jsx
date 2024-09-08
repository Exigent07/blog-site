import Pagination from '@/components/Pagination';
import { getPostsData } from '@/utils/getPost';

export default function Home() {
    const postsData = getPostsData();

    return (
        <Pagination postsData={postsData} />
    );
}
