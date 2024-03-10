import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { urlFor } from "../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import defaultImage from "@/assets/meo.webp";

// Import api
import {
  getAllBlogs,
  // getAllUniqueHashtags,
  // getBlogsByHashtags,
} from "@/service/api";

export const revalidate = 30; // Update every 30 seconds

export default async function Home() {
  const blogs = await getAllBlogs();
  // console.log(data);
  // const allHashtags = await getAllUniqueHashtags();
  // console.log("🏎 ~ Home ~ hashtags:", hashtags);

  // Format created date
  blogs.forEach((blog) => {
    blog._createdAt = new Date(blog._createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return (
    <div>
      {/* Render hashtag filters */}
      {/* <div className="flex flex-wrap">
        {allHashtags.map((hashtag, index) => (
          <Button className="mr-5" key={index}>
            {hashtag}
          </Button>
        ))}
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-6">
        {blogs.map((blog, idx) => (
          <Card
            className="flex flex-col justify-between h-full overflow-hidden"
            key={idx}
          >
            <div className="relative w-full h-48 ">
              <Image
                src={
                  blog.titleImage ? urlFor(blog.titleImage).url() : defaultImage
                }
                alt={blog.title}
                fill
                className="rounded-t-lg object-fill"
                priority
              />
            </div>

            <CardContent className="mt-6 pb-3 flex-grow overflow-auto flex flex-col">
              {blog.hashtags && (
                <p>
                  {blog.hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="mr-2 text-xs text-blue-600 dark:text-blue-300"
                    >
                      {hashtag}
                    </span>
                  ))}
                </p>
              )}

              <div className="flex-grow">
                <h3 className="line-clamp-2 text-xl font-bold">{blog.title}</h3>
                <p className="line-clamp-3 mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {blog.smallDescription}
                </p>
              </div>
              <p className="line-clamp-1 mt-2 text-xs text-gray-600 dark:text-gray-300 italic">
                Created at:{" "}
                <span className="text-blue-600 dark:text-blue-300">
                  {blog._createdAt}
                </span>
              </p>
            </CardContent>

            <CardFooter className="flex items-center justify-center">
              <Button>
                <Link href={`/blog/${blog.Slug}`} className="flex items-center">
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
