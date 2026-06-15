import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewAllCollectionsButtonProps {
  className?: string;
  animatePulse?: boolean;
}

export function ViewAllCollectionsButton({ className, animatePulse = false }: ViewAllCollectionsButtonProps) {
  return (
    <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "px-12 py-6 text-base font-bold tracking-wider", className)}>
      Lihat Semua Koleksi <ArrowRight className={cn("w-5 h-5 ml-2", animatePulse && "animate-pulse")} />
    </Link>
  );
}
