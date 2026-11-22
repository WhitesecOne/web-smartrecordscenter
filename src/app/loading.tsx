import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container-page py-16 lg:py-24" aria-busy="true" aria-label="Memuat halaman">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-5 h-12 max-w-2xl" />
      <Skeleton className="mt-4 h-6 max-w-xl" />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </div>
    </div>
  )
}
