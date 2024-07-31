import type { CollectionConfig } from 'payload'

export const routeGroupCollection: CollectionConfig = {
  admin: {
    group: 'Pings',
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      name: 'repository',
      required: true,
      type: 'text',
    },
    {
      name: 'routes',
      fields: [
        {
          name: 'url',
          required: true,
          type: 'text',
        },
        {
          name: 'enviroment',
          required: true,
          type: 'text',
        },
        {
          hasMany: true,
          name: 'pings',
          admin: {
            hidden: true,
            readOnly: true,
          },
          relationTo: 'pings',
          type: 'relationship',
        },
      ],
      type: 'array',
    },
  ],
  slug: 'routeGroups',
}
