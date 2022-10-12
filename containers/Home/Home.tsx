import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { BlogPostCard } from '../../components/BlogPostCard'
import { HomeInfoSection } from './HomeInfoSection'
import { BlogPost } from '../../shared/types'
import { config } from '../../shared/config'

interface Props {
  posts: BlogPost[]
}

export const Home: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>{config.metaTags.title}</title>
        <meta name='description' content={config.metaTags.mainDescription} />
      </Head>
      <HomeInfoSection />
      <section>
        <div className='flex flex-col space-y-4'>
          {props.posts.map((current: BlogPost) => (
            <BlogPostCard
              title={current.title}
              slug={current.slug}
              imageUrl={current.imageUrl}
              categories={current.categories}
              key={current._id}
              postedDate={current.postedDate}
              ingress={current.ingress}
              sumReactions={current.sumReactions}
              sumComments={current.sumComments}
            />
          ))}
        </div>
      </section>

      <div className='flex justify-center'>
        <Link href={'/posts/2'}>
          <a>
            <button className=' bg-blue-700 rounded py-2 mt-5 px-10 text-center'>More posts</button>
          </a>
        </Link>
      </div>
    </>
  )
}
