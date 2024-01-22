import { getPosts } from "@/fetchers/posts";
import generateOgImage, { type OgData } from "@/utils/openGraph";
import type { APIRoute, GetStaticPaths, GetStaticPathsItem } from "astro";

export const getStaticPaths: GetStaticPaths = async () => {
  const result: GetStaticPathsItem[] = [];

  const blogs = await getPosts();

  for (const blog of blogs) {
    result.push({
      params: { slug: `blog/${blog.slug}` },
      props: {
        title: blog.data.title,
        coverImage: blog.data.coverImage,
        date: blog.data.publishDate,
      },
    });
  }

  return result;
};

export const GET: APIRoute<OgData> = async ({ request, props }) => {
  let imageUrl = new URL(props.coverImage, request.url);

  const response = await generateOgImage(
    props.title,
    imageUrl.toString(),
    props.date,
  );
  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
