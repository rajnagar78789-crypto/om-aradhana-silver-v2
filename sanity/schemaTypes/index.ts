import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import { reel } from './reel'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, reel],
}