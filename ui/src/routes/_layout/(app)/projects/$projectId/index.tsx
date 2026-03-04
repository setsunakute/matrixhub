import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/(app)/projects/$projectId/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/projects/$projectId/models',
      params: { projectId: params.projectId },
    })
  },
})
