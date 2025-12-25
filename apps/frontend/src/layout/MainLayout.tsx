import { Gnb } from '@/components/Gnb'
import { PropsWithChildren } from 'react'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Gnb />
      <main className="mx-auto max-w-7xl pt-20 flex flex-col gap-15 px-4 py-8">{children}</main>
    </>
  )
}
