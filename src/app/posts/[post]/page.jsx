import FullPost from '@/components/FullPost';
import Loading from '@/components/Loading';
import { readFile } from '@/utils/getPost';
import { notFound } from 'next/navigation';

export default function Post({ params }) {
    const { post } = params;
    let postData = null;

    try {
        postData = readFile(`${post}.md`);
        console.log(postData.toc);
        
    } catch (error) {
        console.log(error);
        notFound();
    }

    if (!postData) {
        return <Loading />;
    }

    return (
        <main className="md:pt-[7.5%] pt-[25%] min-h-screen flex flex-col items-center transition-colors duration-300 bg-background text-foreground dark:bg-light-background dark:text-light-foreground">
          <FullPost postData={postData} />
        </main>
    );
}
