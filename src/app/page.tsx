import styles from "./page.module.css";
import { fetchCollection } from "@/utils/cms-utils";
import React from "react";
import RehypeVideo from '@/lib/RehypeVideo/RehypeVideo';
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { SpeedInsights } from "@vercel/speed-insights/next";


async function getData() {
  const res = await fetchCollection('blog-reganshaner-com-post')
  const data = res.json();
  return data;
}

export default async function Home() {
  const { data } = await getData();

  const renderedPosts = data?.map((post: any) => {
    const attributes = post.attributes

    const markdown = attributes.Body;


    const mdxRemoteProps: MDXRemoteProps = {
      source: markdown,
      options: {
        mdxOptions: {
          rehypePlugins: [RehypeVideo],
        }
      }
    }

    return (
      <>
        <SpeedInsights />
        <div key={post.id} className={styles.post}>
          <header className={styles.postHeader}>
            <h1>{attributes.Title}</h1>
            <div className={styles.date}>
              <span>{attributes.Date}</span>
            </div>
          </header>
          <div className={styles.postBody}>
            <MDXRemote {...mdxRemoteProps} />
          </div>
          <footer>
            <span>...</span>
          </footer>
        </div>
      </>
    )
  })

  return (
    <div className={styles.blog}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1><span>NEO</span><span>STALGIC</span></h1>
        </header>
        {renderedPosts}
      </main>
    </div>
  );
}