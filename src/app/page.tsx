import styles from "./page.module.css";
import { fetchCollection } from "@/utils/cms-utils";
import Markdown from "react-markdown";
import React from "react";
import RehypeVideo from '@/lib/RehypeVideo/RehypeVideo';



export default async function Home() {
  const fetchCollection = async (resource: string, init?: RequestInit | undefined) => {
    const pluralResource = resource + 's';
    const apiUrl = `${process.env.STRAPI_HOST}/api/${pluralResource}`;

    const defaultInit = {next: { tags: [resource]}, headers: {"Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`}};
    const mergedInit = {...defaultInit, init}

    return fetch(apiUrl, mergedInit);
  }

  const res = await fetchCollection('blog-reganshaner-com-post')
  const posts: any[] = (await res.json()).data;

  const renderedPosts = posts?.map((post: any) => {
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
          <h1><span>NEO</span><span>STALGIC</span></h1>
        </header>
        {renderedPosts}
      </main>
    </div>
  );
}