import { Models } from '@matrixhub/api-ts/v1alpha1/model.pb'
import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query'

export const PAGE_SIZE = 6

export interface ModelsSearch {
  q: string
  sort: string
  order: 'asc' | 'desc'
  page: number
}

// -- Query key factory --

export const modelKeys = {
  all: ['models'] as const,
  lists: () => [...modelKeys.all, 'list'] as const,
  list: (projectId: string, params: {
    q: string
    sort: string | undefined
    page: number
  }) => [...modelKeys.lists(), projectId, params] as const,
}

// -- Query options factory --

export function modelsQueryOptions(projectId: string, search: ModelsSearch) {
  const sortParam = toSortParam(search.sort, search.order)

  return queryOptions({
    queryKey: modelKeys.list(projectId, {
      q: search.q,
      sort: sortParam,
      page: search.page,
    }),
    queryFn: () => Models.ListModels({
      project: projectId,
      search: search.q || undefined,
      sort: sortParam,
      page: search.page,
      pageSize: PAGE_SIZE,
    }),
  })
}

// -- Custom hook --

export function useModels(projectId: string, search: ModelsSearch) {
  return useQuery({
    ...modelsQueryOptions(projectId, search),
    placeholderData: keepPreviousData,
  })
}

// -- Internal helpers --

function toSortParam(field: string, order: ModelsSearch['order']) {
  switch (field) {
    case 'updatedAt':
      return order === 'asc' ? 'updated_at_asc' : 'updated_at_desc'
    case 'downloads':
    default:
      // downloads sorting is not yet supported by the API, fall back to updatedAt
      return order === 'asc' ? 'updated_at_asc' : 'updated_at_desc'
  }
}
