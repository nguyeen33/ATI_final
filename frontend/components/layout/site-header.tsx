import Link from 'next/link';
import { ExtendedUser } from '@/auth';
import { DashboardIcon, ExitIcon, GearIcon } from '@radix-ui/react-icons';
import { dashboardConfig } from '@/config/routes/dashboard-route';
import { siteConfig } from '@/config/routes/root-route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LoginButton } from '../login_signup/login-button';
import { LogoutButton } from '../login_signup/logout-button';
import { Icons } from '../ui/icons';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from '../theme-toggle';

interface SiteHeaderProps {
  user?: ExtendedUser;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          // sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative size-8 rounded-full"
                  >
                    <Avatar className="size-8">
                      <AvatarImage src="/user.png" alt={user.name ?? ''} />
                      <AvatarFallback>{user.name?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex w-full items-center">
                        <DashboardIcon
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        <span>Dashboard</span>
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/billing" className="flex w-full items-center">
                        <Icons.credit
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex w-full items-center">
                        <GearIcon className="mr-2 size-4" aria-hidden="true" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton>
                      <div className="flex w-full items-center">
                        <ExitIcon className="h-4 w-4 mr-2" />
                        <span>Logout</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </div>
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginButton mode="modal" asChild>
                <Button>Log in</Button>
              </LoginButton>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
