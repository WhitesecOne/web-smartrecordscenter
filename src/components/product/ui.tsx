import { LogoMark } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import type { Status } from "@/lib/sample"
import { statusLabel } from "@/lib/sample"
import { cn } from "@/lib/utils"

export function SampleTag({ className, label = "Data contoh" }: { className?: string; label?: string }) {
  return (
    <span className={cn("rounded-[5px] border border-border bg-white px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground", className)}>
      {label}
    </span>
  )
}

/** Application chrome framing every product screen: deep archive navy bar, module path, optional interactive badge. */
export function MockFrame({
  title,
  children,
  className,
  bodyClassName,
  interactive,
}: {
  title: string
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  interactive?: boolean
}) {
  const [module, screen] = title.split(" · ")
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-navy/12 bg-white text-body shadow-product ring-1 ring-navy/[0.03]", className)}>
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-navy px-3.5 py-2.5">
        <LogoMark className="size-4.5" inverse />
        <figcaption className="min-w-0 flex-1 truncate text-xs text-white/70">
          {screen ? (
            <>
              {module} <span aria-hidden className="mx-1 text-white/35">/</span> <span className="font-semibold text-white">{screen}</span>
            </>
          ) : (
            <span className="font-semibold text-white">{module}</span>
          )}
        </figcaption>
        <div className="flex items-center gap-1.5">
          {interactive && (
            <span className="hidden items-center gap-1.5 rounded-[5px] border border-brand-soft/30 bg-brand/30 px-2 py-0.5 text-[11px] font-semibold text-brand-soft sm:inline-flex">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-soft" />
              Interaktif
            </span>
          )}
          <SampleTag className="border-white/15 bg-white/10 text-white/80" />
        </div>
      </div>
      <div className={bodyClassName}>{children}</div>
    </figure>
  )
}

export function MockPanel({
  title,
  sub,
  action,
  children,
  className,
}: {
  title: string
  sub?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-white", className)}>
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">{title}</p>
          {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

export type Col<T> = { label: string; cell: (row: T) => React.ReactNode; className?: string }

export function MockTable<T>({ cols, rows, minWidth = "34rem" }: { cols: Col<T>[]; rows: T[]; minWidth?: string }) {
  return (
    <>
      <ul className="divide-y divide-border sm:hidden">
        {rows.map((r, i) => (
          <li key={i}>
            <dl className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 px-4 py-3 text-[13px]">
              {cols.map((c) => (
                <div key={c.label} className="contents">
                  <dt className="pt-0.5 text-[11px] font-semibold text-muted-foreground">{c.label}</dt>
                  <dd className="min-w-0 text-body">{c.cell(r)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <MockTableWide cols={cols} rows={rows} minWidth={minWidth} />
    </>
  )
}

function MockTableWide<T>({ cols, rows, minWidth }: { cols: Col<T>[]; rows: T[]; minWidth: string }) {
  return (
    <div className="hidden overflow-x-auto sm:block">
      <table className="w-full border-collapse text-left text-[13px]" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-border bg-mist/80">
            {cols.map((c) => (
              <th key={c.label} scope="col" className={cn("px-4 py-2.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase", c.className)}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border transition-colors last:border-b-0 hover:bg-mist/40">
              {cols.map((c) => (
                <td key={c.label} className={cn("px-4 py-2.5 align-middle text-body", c.className)}>
                  {c.cell(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const shortLabel: Partial<Record<Status, string>> = { pending: "Menunggu" }

export function StatusBadge({ status, short }: { status: Status; short?: boolean }) {
  return (
    <Badge variant={status} title={statusLabel[status]}>
      {short ? (shortLabel[status] ?? statusLabel[status]) : statusLabel[status]}
    </Badge>
  )
}

export function Confidence({ value, threshold = 0.9 }: { value: number; threshold?: number }) {
  const ok = value >= threshold
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-8 text-right font-medium text-navy tabular-nums">{value.toFixed(2).replace(".", ",")}</span>
      <span aria-hidden className="relative h-1.5 w-14 rounded-full bg-secondary">
        <span className={cn("absolute inset-y-0 left-0 rounded-full", ok ? "bg-teal" : "bg-st-pending")} style={{ width: `${value * 100}%` }} />
        <span className="absolute -inset-y-1 w-px bg-navy/50" style={{ left: `${threshold * 100}%` }} />
      </span>
    </span>
  )
}

export const Code = ({ children }: { children: React.ReactNode }) => <span className="code text-[12.5px] text-navy">{children}</span>
