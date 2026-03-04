import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/(app)/profile/')({
  component: RouteComponent,
  staticData: {
    navName: 'Profile',
  },
})

function RouteComponent() {
  return <div>Profile Page</div>
}
