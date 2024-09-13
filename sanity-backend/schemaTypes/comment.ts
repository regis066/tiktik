import {defineType, defineField} from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
  ],
})
