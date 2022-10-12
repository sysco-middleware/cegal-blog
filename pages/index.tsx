import { format } from 'date-fns'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { BlogPostCard } from '../components/BlogPostCard'
import { HomeInfoSection } from '../containers/Home/HomeInfoSection'
import { Category } from '../shared/Category.interface'
import { config } from '../shared/config'
import { defaultDateFormat } from '../shared/dateHelpers'
import { sanityClient } from '../shared/sanityClient'
import { SanitySlug } from '../shared/SanitySlug.interface'
import { BlogPost } from '../shared/types'
import { Home } from '../containers/Home/Home'

export const getStaticProps: GetStaticProps = async () => {
  // ^ means current document
  // simple but slow ordering due to low post volume
  const query = `
    *[_type == "post"]
    | order(_createdAt desc) [0...${config.postsPerPage}]
    {title, ingress, slug, "imageUrl": mainImage.asset->url, fireReactions, surprisedReactions, mehReactions, _id, _createdAt, _updatedAt,
      categories[]->{title, slug},
      "sumComments": count(*[_type == "comment" && postId._ref == ^._id])
    }`

  const posts: BlogPost[] = ((await sanityClient.fetch(query)) as BlogPost[]).map(current => ({
    ...current,
    postedDate: format(new Date(current._createdAt), defaultDateFormat),
    sumReactions: current.fireReactions + current.surprisedReactions + current.mehReactions
  }))

  return {
    props: { posts: posts },
    revalidate: config.defaultRevalidateTime
  }
}

export default Home
