'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogOut, Settings, User, CreditCard } from 'lucide-react';
import { userRoutes } from '@/config/routes';

export function UserMenu() {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  const initials = user.name
    ?.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase() || user.email?.[0].toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href={userRoutes.dashboard} className="w-full">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={userRoutes.billing} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={userRoutes.settings} className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/signout" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}