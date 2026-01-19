/// <reference types="vite/client" />

declare module '*.mdx' {
  let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}

declare module 'virtual:blog-posts' {
  export type BlogPost = {
    title: string;
    date: string;
    excerpt: string;
    section: string;
    slug: string;
  };

  export type BlogSections = {
    [key: string]: BlogPost[];
  };

  export const blogSections: BlogSections;
  export const postLookup: Record<string, BlogPost>;
}
