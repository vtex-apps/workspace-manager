import React from 'react'
import {
  Table
} from 'vtex.styleguide'
import faker from 'faker'

const defaultSchema = {
  properties: {
    name: {
      title: 'Name',
    },
    email: {
      title: 'Email',
    },
    number: {
      title: 'Number',
    },
  },
}
export interface RowHeader {
  rowData: { name: String}
}
const lineActions = [
  {
    label: ({ rowData } : RowHeader) => `Action for ${rowData.name}`,
    onClick: ({ rowData }: RowHeader) => alert(`Executed action for ${rowData.name}`),
  },
  {
    label: ({ rowData }: RowHeader) => `DANGEROUS action for ${rowData.name}`,
    isDangerous: true,
    onClick: ({ rowData }: RowHeader) =>
      alert(`Executed a DANGEROUS action for ${rowData.name}`),
  },
]

const EXAMPLE_LENGTH = 100
const MOCKED_DATA = [...Array(EXAMPLE_LENGTH)].map(() => ({
  avatar: faker.internet.avatar(),
  name: faker.name.findName(),
  streetAddress: faker.address.streetAddress(),
  cityStateZipAddress: `${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
  email: faker.internet.email().toLowerCase(),
}))

export interface items {
  name: string
  production: boolean
}

// @ts-ignore
const WorkspaceAdmin = ({items}) => {
  return (
    <div>
      <div className="mb5">
        <Table
          fullWidth
          schema={defaultSchema}
          items={items}
          lineActions={lineActions}
        />
      </div>
    </div>
  )
}

export default WorkspaceAdmin;
