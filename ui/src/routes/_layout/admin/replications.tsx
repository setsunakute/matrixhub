import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/admin/replications')({
  component: RouteComponent,
  staticData: {
    navName: 'Replications',
  },
})

function RouteComponent() {
  return (
    <div>
      <Title order={3}>Replications</Title>
    </div>
  )
}
