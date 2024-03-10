// Get all blog data
import { sanityClient } from "@/lib/sanity";

export async function getAllBlogs() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
    smallDescription,
    'Slug': slug.current,
    titleImage,
    'hashtags':hashtags[],
    _createdAt
  }
  `;

  return await sanityClient.fetch(query);
}

// Get content of a blog by slug
export async function getBlogBySlug(slug) {
  const query = `
    *[_type == 'blog' && slug.current == "${slug}"]{
      title,
      'Slug': slug.current,
      content,
      titleImage,
      'hashtags':hashtags[],
      _createdAt
    }[0]
  `;
  const params = { slug };
  return await sanityClient.fetch(query, params);
}

// Get all hashtags data
export async function getAllUniqueHashtags() {
  const query = `
    *[_type == "blog"]{
      hashtags[]
    }
  `;

  const blogs = await sanityClient.fetch(query);
  const hashtags = blogs
    .reduce((acc, blog) => acc.concat(blog.hashtags), [])
    .filter((hashtag, index, self) => self.indexOf(hashtag) === index); // Unique hashtags

  return hashtags;
}

export async function getBlogsByHashtags(hashtagsArray) {
  if (hashtagsArray.length === 0) {
    return getAllBlogs(); // Return all blogs if no hashtags are selected
  }
  const query = `
    *[_type == "blog" && count((hashtags[][@ in $selectedHashtags])) > 0] {
      title,
      smallDescription,
      'Slug': slug.current,
      titleImage,
      hashtags,
      _createdAt
    }
  `;
  const params = { selectedHashtags: hashtagsArray };
  return await client.fetch(query, params);
}
