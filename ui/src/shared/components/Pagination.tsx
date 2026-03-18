import {
  Group,
  Pagination as MantinePagination,
  Text,
} from '@mantine/core'
import { startTransition } from 'react'

import type { ReactNode } from 'react'

export interface PaginationProps {
  total: number
  totalPages: number
  page: number
  onPageChange: (page: number) => void
  totalLabel?: ReactNode
}

export function Pagination({
  total,
  totalPages,
  page,
  onPageChange,
  totalLabel,
}: PaginationProps) {
  if (total <= 0 || totalPages <= 1) {
    return null
  }

  return (
    <Group justify="space-between" py="sm">
      {totalLabel && (
        <Text size="sm" fw={500} c="dimmed">
          {totalLabel}
        </Text>
      )}
      <MantinePagination
        size="xs"
        radius="sm"
        value={page}
        onChange={(nextPage) => {
          startTransition(() => {
            onPageChange(nextPage)
          })
        }}
        total={totalPages}
      />
    </Group>
  )
}
