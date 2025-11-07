'use client';

import { Button } from '@/components/ui/button';

interface StripeButtonProps {
  productId: string;
  className?: string;
  children?: React.ReactNode;
}

export function StripeButton({ productId, className, children }: StripeButtonProps) {
  const handleClick = async () => {
    // Add stripe integration logic here
  };

  return (
    <Button onClick={handleClick} className={className}>
      {children || 'Subscribe'}
    </Button>
  );
}