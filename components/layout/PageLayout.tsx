import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function PageLayout ({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='px-14'>{children}</main>
      <Footer />
    </>
  )
}
