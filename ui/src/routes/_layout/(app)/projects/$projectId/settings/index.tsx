import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/(app)/projects/$projectId/settings/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = Route.useParams()

  return (
    <div>
      Project Settings Page - Project ID:
      {projectId}
    </div>
  )
}
