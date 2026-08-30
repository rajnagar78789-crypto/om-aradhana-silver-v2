export default {
  name: 'idol',
  title: 'VIP Idols (999)',
  type: 'document',
  fields: [
    { 
      name: 'name', 
      title: 'Item Name', 
      type: 'string' 
    },
    { 
      name: 'sku', 
      title: 'SKU (Item Code)', 
      type: 'string' 
    },
    {
      name: 'category',
      title: 'Idol Category',
      type: 'string',
      options: {
        list: [
          { title: 'Ganesh Ji', value: 'ganesh_ji' },
          { title: 'Laxmi Ji', value: 'laxmi_ji' },
          { title: 'Laxmi Ganesh Ji Jodi', value: 'laxmi_ganesh_jodi' },
          { title: 'Hanuman Ji', value: 'hanuman_ji' },
          { title: 'Krishna Ji / Laddu Gopal', value: 'krishna_ji' },
          { title: 'Ram Darbar', value: 'ram_darbar' },
          { title: 'Shiv Parvati', value: 'shiv_parvati' },
          { title: 'Saraswati Maa', value: 'saraswati_maa' },
          { title: 'Mataji', value: 'mataji' },
          { title: 'Jain Idols', value: 'jain_idols' },
          { title: 'Animal Idols', value: 'animal_idols' },
          { title: 'Gujarat Collection', value: 'gujarat_collection' },
          { title: 'Other Idols', value: 'other_idols' },
        ]
      }
    },
    { 
      name: 'weight', 
      title: 'Weight', 
      type: 'string' 
    },
    { 
      name: 'image', 
      title: 'Idol Image', 
      type: 'image', 
      options: { hotspot: true } 
    }
  ]
}