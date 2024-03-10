// path/to/your/dataFetchingLogic.js
import {
  getAllBlogs,
  getAllUniqueHashtags,
  getBlogsByHashtags,
} from "@/service/api";

export async function getServerSideProps(context) {
  const { query } = context;
  const selectedHashtag = query.hashtag;

  const blogs = selectedHashtag
    ? await getBlogsByHashtags([selectedHashtag])
    : await getAllBlogs();

  const hashtags = await getAllUniqueHashtags();

  return { props: { blogs, hashtags } };
}
