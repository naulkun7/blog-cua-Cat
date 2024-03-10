import PropTypes from "prop-types";
import { sanityClient, urlFor } from "@/lib/sanity";
import Image from "next/image";
import defaultImage from "@/assets/meo.webp";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";

export const revalidate = 30; // Update every 30 seconds

async function getBlogBySlug(slug) {
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

async function BlogArticle({ params }) {
  const { slug } = params;
  const data = await getBlogBySlug(slug);
  // console.log(data);

  data._createdAt = new Date(data._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Barebones lazy-loaded image component
  const SampleImageComponent = ({ value, isInline }) => {
    const { width, height } = getImageDimensions(value);
    return (
      <Image
        src={urlFor(value).url()}
        alt={value.alt || " "}
        width={1000}
        height={400}
        priority
        className={`${isInline ? "inline-block" : "block"} border ${
          width / height
        } aspect-w-16 aspect-h-9 rounded-lg`}
      />
    );
  };

  const components = {
    types: {
      image: SampleImageComponent,
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="block text-base text-md md:text-lg">{data._createdAt}</p>
        {data.hashtags && (
          <p className="block text-base text-md md:text-lg italic text-primary dark:text-primary-light">
            {data.hashtags.map((hashtag, index) => (
              <span key={index} className="mr-2">
                {hashtag}
              </span>
            ))}
          </p>
        )}
      </div>
      <h1 className="mt-4 block text-2xl text-center leading-8 font-bold tracking-tight md:text-4xl ">
        {data.title}
      </h1>
      <div className="mt-4 block">
        <Image
          src={data.titleImage ? urlFor(data.titleImage).url() : defaultImage}
          alt={data.title}
          width={1000}
          height={800}
          className="rounded-lg"
          priority
        />
      </div>
      <div className="mt-16 prose prose-blue prose-md md:prose-xl dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} components={components} />
      </div>
    </div>
  );
}

BlogArticle.propTypes = {
  params: PropTypes.object.isRequired,
};

export default BlogArticle;
