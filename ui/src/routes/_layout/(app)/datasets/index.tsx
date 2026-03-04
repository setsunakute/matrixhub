import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/(app)/datasets/')({
  component: RouteComponent,
  staticData: {
    navName: 'Datasets',
  },
})

function RouteComponent() {
  return <div>Datasets Page</div>
}
