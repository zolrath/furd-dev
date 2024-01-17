import { getCollection } from "astro:content";

export async function getCategories() {
  const posts = await getCollection("blog", ({ data }) => {
    // Filter out draft posts in production
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const categories = [
    ...new Set([].concat.apply(posts.map((post) => post.data.category))),
  ];

  return categories;
}

export async function getPosts() {
  const posts = (await getCollection("blog", ({ data }) => {
    // Filter out draft posts in production
    return import.meta.env.PROD ? data.draft !== true : true;
  })).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return posts;
}

export async function getPostsByCategory(category: string) {
  const posts = (await getCollection("blog", ({ data }) => {
    var draftFilter = import.meta.env.PROD ? data.draft !== true : true;
    var categoryFilter = data.category === category;
    return categoryFilter && draftFilter;
  })).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return posts;
}

export async function getPostsByTag(tag: string) {
  const posts = (await getCollection("blog", ({ data }) => {
    var draftFilter = import.meta.env.PROD ? data.draft !== true : true;
    var tagFilter = data.tags.includes(tag);
    return tagFilter && draftFilter;
  })).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return posts;
}

export async function getTags() {
  let posts = await getCollection("blog", ({ data }) => {
    // Filter out draft posts in production
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  let tags = posts.reduce((tags, post) => { 
    post.data.tags.forEach(tag => tags.add(tag))
    return tags
  }, new Set<string>())

  return Array.from(tags);
}
