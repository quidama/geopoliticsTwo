'use client';
import { useState, useEffect } from 'react';
import BlogContent from '@/components/BlogContent';
import BlogList from '@/components/BlogList';
import steem from 'steem';
import selectTitle from '@/services/selectTitle';

export default function BlogPage({ params: { slug } }) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await steem.api.getContentAsync(slug[0], slug[1]);
        setBlog(result);
      } catch (error) {
        console.error('블로그 내용을 불러오는 중 오류 발생:', error);
      }
    };

    if (slug.length === 2) {
      fetchData();
    } else {
      // slug의 길이가 2가 아닌 경우 상태를 초기화합니다.
      setBlog(null);
    }
  }, [slug]);

  if (slug.length === 1) {
    return (
      <section>
        <BlogList
          tag={slug[0]}
          sectionTitle={selectTitle(slug[0])[0]}
          sectionDescription={selectTitle(slug[0])[1]}
        />
      </section>
    );
  } else if (blog) {
    return (
      <article className='rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4'>
        <BlogContent blog={blog} sectionTitle={selectTitle(slug[0])[0]} />
      </article>
    );
  } else {
    return <div>블로그 내용을 불러오는 중...</div>;
  }
}
