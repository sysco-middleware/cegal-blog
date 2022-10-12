import Link from 'next/link'

interface PageItem {
  href: string
  label: string
}

export function Header () {
  const pages: PageItem[] = [
    {
      href: '/',
      label: 'Blog'
    },
    {
      href: '/video',
      label: 'Videos'
    },
    {
      href: '/about',
      label: 'About'
    }
  ]

  return (
    <header className='h-40 border-[#00FF97] border-b px-14'>
      <div className='text-primary mx-auto flex max-w-8xl items-center justify-between h-full'>
        <Link href='/'>
          <a className='text-primary focus:outline-none block whitespace-nowrap text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium transition'>
            CEGAL
          </a>
        </Link>
      </div>
    </header>
  )
}
