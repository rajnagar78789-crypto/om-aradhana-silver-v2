import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'heroSlider',
  title: 'Home Page VIP Slider',
  type: 'document',
  fields: [
    defineField({
      name: 'sliderName',
      title: 'Slider Ka Naam (Jaise: Diwali Collection)',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      title: 'Top Products Videos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'slideItem', 
          fields: [
            defineField({ 
              name: 'productName', 
              title: 'Jewelry Ka Naam', 
              type: 'string' 
            }),
            defineField({ 
              name: 'videoFile', 
              title: 'Product Video (MP4 upload kar)', 
              type: 'file',
              options: { accept: 'video/mp4' }
            }),
            defineField({ 
              name: 'tagline', 
              title: 'VIP Tagline', 
              type: 'string' 
            }),
            // 🔥 YEH RAHA TERA NAYA LINK WALA DABBA 👇
            defineField({
              name: 'collectionLink',
              title: 'Button ka Link (Jaise: /collections/fusion-jewellery)',
              type: 'string',
              description: 'Customer click karke kis page par jayega?'
            })
          ]
        })
      ]
    })
  ]
})