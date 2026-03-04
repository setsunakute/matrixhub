import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/(app)/')({
  beforeLoad: () => {
    throw redirect({
      to: '/models',
      replace: true,
    })
  },
})
