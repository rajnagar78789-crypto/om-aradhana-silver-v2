import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import { reel } from './reel'
import heroSlider from './heroSlider' // 🔥 1. Apna VIP Slider yahan import kiya

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, reel, heroSlider], // 🔥 2. Is line mein product aur reel ke aage daal diya
}