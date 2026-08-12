import { defineField, defineType } from 'sanity'

export const reel = defineType({
  name: 'reel',
  title: 'Reels Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Reel Title',
      type: 'string',
      description: 'Is reel ka naam (jaise: Antique Bangle Collection)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File (MP4)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/x-m4v,video/*',
      },
      description: 'Yahan apna AI wala vertical video upload kar',
    }),
  ],
})