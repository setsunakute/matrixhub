import {
  AppShell,
  Avatar,
  Flex,
  Group, Menu,
  NavLink,
  Text, UnstyledButton,
} from '@mantine/core'
import {
  createFileRoute,
  Link, linkOptions,
  Outlet, useMatchRoute,
} from '@tanstack/react-router'

import ArrowDownIcon from '@/assets/svgs/arrow-down.svg?react'
import DatasetIcon from '@/assets/svgs/dataset.svg?react'
import LogoIcon from '@/assets/svgs/logo.svg?react'
import LogOutIcon from '@/assets/svgs/logout.svg?react'
import ModelIcon from '@/assets/svgs/model.svg?react'
import ProjectIcon from '@/assets/svgs/project.svg?react'
import SettingsIcon from '@/assets/svgs/settings.svg?react'
import UserIcon from '@/assets/svgs/user.svg?react'
import i18n from '@/i18n'

export const Route = createFileRoute('/(auth)')({
  component: AppLayout,
})

function AppLogo() {
  return (
    <UnstyledButton
      component={Link}
      to="/"
    >
      <Group gap={8}>
        <LogoIcon width={36} />
        <Text
          fw={600}
          size="20px"
          lh="28px"
          c="#000"
        >
          MatrixHub
        </Text>
      </Group>
    </UnstyledButton>
  )
}

function AppNavbar() {
  const navRoutes = [
    {
      label: i18n.t('nav.models'),
      icon: ModelIcon,
      ...linkOptions({
        to: '/models',
      }),
    },
    {
      label: i18n.t('nav.datasets'),
      icon: DatasetIcon,
      ...linkOptions({
        to: '/datasets',
      }),
    },
    {
      label: i18n.t('nav.projectManagement'),
      icon: ProjectIcon,
      ...linkOptions({
        to: '/projects',
      }),
    },
  ]
  const matchRoute = useMatchRoute()

  return (
    <Group
      gap={16}
      wrap="nowrap"
    >
      {navRoutes.map((route) => {
        const isActive = !!matchRoute({
          to: route.to,
          fuzzy: true,
        })

        return (
          <NavLink
            key={route.to}
            label={route.label}
            component={Link}
            to={route.to}
            leftSection={<route.icon width={20} />}
            active={isActive}
            styles={{
              root: {
                width: 'auto',
                height: '32px',
                borderRadius: '16px',
                fontWeight: '600',
                color: isActive ? '#15AABF' : '#868E96',
              },
              section: {
                marginInlineEnd: '8px',
              },
            }}
          />
        )
      })}
    </Group>
  )
}

function AccountMenu() {
  const menuItems = [
    {
      label: i18n.t('nav.profile'),
      icon: UserIcon,
      ...linkOptions({
        to: '/profile',
      }),
    },
    {
      label: i18n.t('nav.createModel'),
      icon: ModelIcon,
      ...linkOptions({
        to: '/models/new',
      }),
    },
    {
      label: i18n.t('nav.createDataset'),
      icon: DatasetIcon,
      ...linkOptions({
        to: '/datasets/new',
      }),
    },
    {
      label: i18n.t('nav.settings'),
      icon: SettingsIcon,
      ...linkOptions({
        to: '/admin',
      }),
    },
  ]

  return (
    <Menu
      shadow="md"
      withArrow
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={12}>
            <Avatar
              radius="xl"
              size={24}
            />
            <Text size="sm">
              Admin
            </Text>
            <ArrowDownIcon width={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {
          menuItems.map(item => (
            <Menu.Item
              key={item.label}
              leftSection={<item.icon width={16} color="#868E96" />}
              component={Link}
              to={item.to}
            >
              {item.label}
            </Menu.Item>
          ))
        }
        <Menu.Item
          leftSection={<LogOutIcon width={16} />}
        >
          {i18n.t('nav.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

function AppLayout() {
  return (
    <AppShell
      mode="static"
      header={{ height: 60 }}
    >
      <AppShell.Header
        withBorder={false}
        style={{ background: '#F8F9FA' }}
      >
        <Flex
          h="100%"
          align="center"
          justify="space-between"
          px={24}
        >
          <Group
            gap={135}
            wrap="nowrap"
          >
            <AppLogo />

            <AppNavbar />
          </Group>

          <AccountMenu />
        </Flex>
      </AppShell.Header>

      <AppShell.Main
        styles={{
          main: {
            height: 'calc(100vh - var(--app-shell-header-height))',
          },
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
