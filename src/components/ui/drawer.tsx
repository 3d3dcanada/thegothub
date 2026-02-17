'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

// VisuallyHidden component for screen reader accessibility
const VisuallyHidden: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  ...props
}) => (
  <span
    className={cn(
      'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
      '[clip:rect(0,0,0,0)]',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

export function DrawerTrigger({ children, ...props }: React.ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props}>{children}</Dialog.Trigger>;
}

interface DrawerContentProps extends React.ComponentProps<typeof Dialog.Content> {
  showClose?: boolean;
}

export function DrawerContent({ 
  children, 
  className, 
  showClose = true,
  ...props 
}: DrawerContentProps) {
  return (
    <Dialog.Portal>
      {/* Overlay */}
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      
      {/* Content - Slide in from right */}
      <Dialog.Content
        className={cn(
          'fixed z-50 gap-4 bg-background shadow-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          'right-0 top-0 h-full w-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
          'overflow-y-auto',
          className
        )}
        {...props}
      >
        {/* Accessible title for screen readers */}
        <Dialog.Title asChild>
          <VisuallyHidden>Project Details</VisuallyHidden>
        </Dialog.Title>
        {children}
        {showClose && (
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  );
}

export function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  );
}

export function DrawerTitle({ className, ...props }: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function DrawerDescription({ className, ...props }: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
