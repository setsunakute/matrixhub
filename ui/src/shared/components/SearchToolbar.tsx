import {
  Flex,
  Group,
  TextInput,
} from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import {
  startTransition,
  useEffect,
  useRef,
} from 'react'

import SearchIcon from '@/assets/svgs/search.svg?react'

import type { ReactNode } from 'react'

export interface SearchToolbarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  debounceMs?: number
  children?: ReactNode
}

const DEFAULT_DEBOUNCE_MS = 300

export function SearchToolbar({
  searchPlaceholder,
  searchValue = '',
  onSearchChange,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  children,
}: SearchToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearchChange = useDebouncedCallback((value: string) => {
    startTransition(() => {
      onSearchChange?.(value)
    })
  }, debounceMs)

  useEffect(() => {
    debouncedSearchChange.cancel()

    const input = inputRef.current

    if (input && input.value !== searchValue) {
      input.value = searchValue
    }
  }, [searchValue, debouncedSearchChange])

  const showSearch = Boolean(searchPlaceholder && onSearchChange)

  return (
    <Flex justify="space-between" align="center" wrap="nowrap" gap="md" mb="md">
      {showSearch && (
        <TextInput
          defaultValue={searchValue}
          ref={inputRef}
          placeholder={searchPlaceholder}
          leftSection={(
            <SearchIcon
              width={14}
              height={14}
              style={{ color: 'var(--mantine-color-gray-5)' }}
            />
          )}
          onChange={(event) => {
            const nextQuery = event.currentTarget.value.trim()

            if (nextQuery === searchValue) {
              debouncedSearchChange.cancel()

              return
            }

            debouncedSearchChange(nextQuery)
          }}
          styles={{
            input: {
              height: 32,
              minHeight: 32,
              borderRadius: 16,
              fontSize: '14px',
            },
          }}
          w={260}
        />
      )}

      {children && (
        <Group gap="md" wrap="nowrap" ml="auto">
          {children}
        </Group>
      )}
    </Flex>
  )
}
