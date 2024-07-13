import styles from "./page.module.css";
import { fetchCollection } from "@/utils/cms-utils";
import Markdown from "react-markdown";
import React from "react";
import RehypeVideo from '@/lib/RehypeVideo/RehypeVideo';


async function getData() {
  const res = await fetchCollection('blog-reganshaner-com-post')
  const data = res.json();
  return data;
}

export default async function Home() {
  const {data} = await getData();


  const posts: React.ReactNode[] = data?.map((post: any) => {
    const attributes = post.attributes

    return (
      <div key={post.id} className={styles.post}>
        <header className={styles.postHeader}>
          <h1>{attributes.Title}</h1>
          <div className={styles.date}>
            <span>{attributes.Date}</span>
          </div>
        </header>
        <div className={styles.postBody}>
          <Markdown rehypePlugins={[[RehypeVideo]]}>
            {attributes.Body}
          </Markdown>
        </div>
        <footer>
          <span>...</span>
        </footer>
      </div>
    )
  })

  return (
    <div className={styles.blog}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1><span>NEO</span><span>STALGIA</span></h1>
        </header>
        {posts}
      </main>
    </div>
  );
}
