import type { CollectionConfig } from 'payload'

export const pingCollection: CollectionConfig = {
  admin: {
    group: 'Pings',
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'isSuccess',
      type: 'checkbox',
    },
    {
      name: 'timestamp',
      type: 'date',
    },
    {
      name: 'responseTimeInMs',
      type: 'number',
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
  slug: 'pings',
}
