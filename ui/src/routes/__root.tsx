import {
  createRootRoute, Outlet, HeadContent,
} from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import i18n from '@/i18n'

const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then(m => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <Suspense fallback={null}>
        <TanStackRouterDevtools initialIsOpen={false} />
      </Suspense>
    </>
  ),
  head: () => ({
    meta: [{
      title: i18n.t('translation.title'),
    }],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico?',
      },
    ],
  }),
})
