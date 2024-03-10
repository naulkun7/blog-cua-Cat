export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title *',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug *',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hashtags',
      title: 'Hashtags',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'titleImage',
      title:
        'Title Image (Nên nén hình dưới 500kb trước khi upload nha (vòng vòng 100kb - 1mb là ok rồi))',
      type: 'image',
    },
    {
      name: 'smallDescription',
      title: 'Small Description',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
      ],
    },
  ],
}
