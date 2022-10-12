import NextLink from 'next/link'
import { Button } from '@cegal/ui-components'
import { Link } from '@cegal/ui-components'
import { Category } from '../shared/Category.interface'

export function PostCategoriesList (props: { categories: Category[] }) {
  return (
    <div className='flex space-x-2'>
      {props.categories &&
        props.categories.map(({ slug, title }) => (
          <NextLink href={'/category/' + slug.current} key={slug.current} passHref>
            <Link>{title}</Link>
          </NextLink>
        ))}
    </div>
  )
}
