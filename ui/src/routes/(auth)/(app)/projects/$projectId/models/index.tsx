import {
  Box,
  Button,
  Center,
  Stack,
  Text,
} from '@mantine/core'
import { Category } from '@matrixhub/api-ts/v1alpha1/model.pb'
import {
  createFileRoute,
  Link,
} from '@tanstack/react-router'
import { startTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import ArrowBarToDownIcon from '@/assets/svgs/arrow-bar-to-down.svg?react'
import BinaryTreeIcon from '@/assets/svgs/binary-tree.svg?react'
import ClockIcon from '@/assets/svgs/clock.svg?react'
import ModelIcon from '@/assets/svgs/model.svg?react'
import PhotoUpIcon from '@/assets/svgs/photo-up.svg?react'
import ProjectIcon from '@/assets/svgs/project.svg?react'
import PytorchIcon from '@/assets/svgs/pytorch.svg?react'
import {
  modelsQueryOptions,
  PAGE_SIZE,
  useModels,
} from '@/features/models/models.query'
import {
  buildModelBadges,
  buildModelTitle,
  formatDate,
  formatStorageSize,
} from '@/features/models/models.utils'
import { Pagination } from '@/shared/components/Pagination'
import { ResourceCard } from '@/shared/components/ResourceCard'
import { ResourceCardGrid } from '@/shared/components/ResourceCardGrid'
import { SearchToolbar } from '@/shared/components/SearchToolbar'
import { SortDropdown } from '@/shared/components/SortDropdown'

import type { SortDropdownOption } from '@/shared/components/SortDropdown'

// -- URL search schema (route concern) --

const sortFieldSchema = z.enum(['updatedAt', 'downloads'])

const modelsSearchSchema = z.object({
  q: z.string().transform(v => v.trim()).catch(''),
  sort: sortFieldSchema.catch('updatedAt'),
  order: z.enum(['asc', 'desc']).catch('desc'),
  page: z.coerce.number().int().positive().catch(1),
})

function isSortField(value: unknown): value is z.infer<typeof sortFieldSchema> {
  return sortFieldSchema.safeParse(value).success
}

// -- Route definition --

export const Route = createFileRoute(
  '/(auth)/(app)/projects/$projectId/models/',
)({
  validateSearch: search => modelsSearchSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: async ({
    context,
    params,
    deps,
  }) => {
    await context.queryClient.ensureQueryData(
      modelsQueryOptions(params.projectId, deps),
    )
  },
  component: RouteComponent,
})

// -- Component --

function RouteComponent() {
  const { projectId } = Route.useParams()
  const navigate = Route.useNavigate()
  const {
    q: query,
    sort: sortField,
    order: sortOrder,
    page,
  } = Route.useSearch()
  const { t } = useTranslation()

  const {
    data,
    isError,
    isFetching,
    isPending,
  } = useModels(projectId, {
    q: query,
    sort: sortField,
    order: sortOrder,
    page,
  })

  const models = data?.items ?? []
  const pagination = data?.pagination
  const total = pagination?.total ?? 0
  const totalPages = pagination?.pages
    ?? (
      pagination?.total && pagination?.pageSize
        ? Math.ceil(pagination.total / pagination.pageSize)
        : 0
    )
  const showSkeletons = isPending && !data
  const showErrorState = isError && !data
  const isRefreshing = isFetching && !showSkeletons
  const isEmpty = !showSkeletons && !showErrorState && models.length === 0

  const sortFieldOptions: SortDropdownOption[] = [
    {
      value: 'updatedAt',
      label: t('projects.detail.modelsPage.sortFieldUpdatedAt'),
      icon: <ClockIcon width={16} height={16} />,
    },
    {
      value: 'downloads',
      label: t('projects.detail.modelsPage.sortFieldDownloads'),
      icon: <ArrowBarToDownIcon width={16} height={16} />,
      disabled: true,
    },
  ]

  const cardElements = models.map((model) => {
    const modelName = model.name?.trim()

    return (
      <ResourceCard
        key={`${model.project ?? projectId}/${model.name ?? 'unknown'}`}
        title={buildModelTitle(model, projectId)}
        renderRoot={modelName
          ? (props: Record<string, unknown>) => (
              <Link
                {...props}
                to="/projects/$projectId/models/$modelId"
                params={{
                  projectId,
                  modelId: modelName,
                }}
              />
            )
          : undefined}
        badges={buildModelBadges(model, {
          taskCategory: Category.TASK,
          libraryCategory: Category.LIBRARY,
          taskIcon: (
            <PhotoUpIcon
              width={16}
              height={16}
              style={{ color: 'var(--mantine-color-blue-4)' }}
            />
          ),
          libraryIconFn: name => /pytorch/i.test(name)
            ? <PytorchIcon width={16} height={16} />
            : undefined,
          parameterCountIcon: (
            <BinaryTreeIcon
              width={16}
              height={16}
              style={{ color: 'var(--mantine-color-violet-4)' }}
            />
          ),
        })}
        metaItems={[
          {
            key: 'project',
            icon: <ProjectIcon width={16} height={16} />,
            value: model.project ?? projectId,
          },
          {
            key: 'size',
            icon: <ModelIcon width={16} height={16} />,
            value: formatStorageSize(model.size),
          },
          {
            key: 'updatedAt',
            icon: <ClockIcon width={16} height={16} />,
            value: formatDate(model.updatedAt),
          },
        ]}
      />
    )
  })

  return (
    <Box pt={20}>
      <Stack gap={0}>
        <SearchToolbar
          searchPlaceholder={t('projects.detail.modelsPage.searchPlaceholder')}
          searchValue={query}
          onSearchChange={(nextQuery) => {
            void navigate({
              replace: true,
              search: prev => ({
                ...prev,
                q: nextQuery,
                page: 1,
              }),
            })
          }}
        >
          <SortDropdown
            fieldOptions={sortFieldOptions}
            fieldValue={sortField}
            order={sortOrder}
            refreshing={isRefreshing}
            onFieldChange={(nextField) => {
              if (sortFieldOptions.find(o => o.value === nextField)?.disabled) {
                return
              }

              startTransition(() => {
                void navigate({
                  replace: true,
                  search: prev => ({
                    ...prev,
                    sort: isSortField(nextField) ? nextField : prev.sort,
                    order: sortOrder,
                    page: 1,
                  }),
                })
              })
            }}
            onToggleOrder={() => {
              startTransition(() => {
                void navigate({
                  replace: true,
                  search: prev => ({
                    ...prev,
                    order: sortOrder === 'desc' ? 'asc' : 'desc',
                    page: 1,
                  }),
                })
              })
            }}
          />

          <Button
            h={32}
            px="md"
            radius={6}
            leftSection={<ModelIcon width={16} height={16} />}
            component={Link}
            to="/models/new"
          >
            {t('projects.detail.modelsPage.create')}
          </Button>
        </SearchToolbar>

        <ResourceCardGrid
          loading={showSkeletons}
          skeletonCount={PAGE_SIZE}
        >
          {cardElements}
        </ResourceCardGrid>

        {isEmpty && (
          <Center py="xl">
            <Stack align="center" gap="xs">
              <Text fw={500}>{t('projects.detail.modelsPage.emptyTitle')}</Text>
              <Text size="sm" c="dimmed">
                {t('projects.detail.modelsPage.emptyDescription')}
              </Text>
            </Stack>
          </Center>
        )}

        <Pagination
          total={total}
          totalPages={totalPages}
          page={page}
          onPageChange={(nextPage) => {
            void navigate({
              search: prev => ({
                ...prev,
                page: nextPage,
              }),
            })
          }}
          totalLabel={t('shared.total', { count: total })}
        />
      </Stack>
    </Box>
  )
}
