import React, {FunctionComponent} from 'react'
import {CardResource} from 'components/pages/home/card'
import Markdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'
import {get} from 'lodash'
import {bpMinMD} from 'utils/breakpoints'
import {track} from 'utils/analytics'

type JumbotronProps = {
  resource: CardResource
}

const Jumbotron: FunctionComponent<JumbotronProps> = ({resource}) => {
  const {path, image, title, byline, instructor, description} = resource
  return (
    <div
      className="md:-mt-5 relative flex items-center justify-center bg-gray-900 dark:bg-gray-800 text-white overflow-hidden rounded-b-lg md:rounded-t-none rounded-t-lg shadow-sm"
      css={{
        [bpMinMD]: {
          minHeight: 477,
        },
      }}
    >
      <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 h-2 " />
      <div className="relative z-10 px-5 sm:py-16 py-10 sm:text-left text-center">
        <div className="space-y-5 mx-auto flex items-center justify-center max-w-screen-xl lg:px-8 w-full">
          <div className="flex lg:flex-row flex-col items-center justify-center sm:space-x-5 sm:space-y-0 space-y-5 0 w-full xl:pr-16">
            <div className="flex-shrink-0">
              <Link href={path}>
                <a
                  tabIndex={-1}
                  onClick={() =>
                    track('clicked jumbotron resource', {
                      resource: path,
                      linkType: 'image',
                    })
                  }
                >
                  <Image
                    quality={100}
                    src={get(image, 'src', image)}
                    width={300}
                    height={300}
                    alt={get(image, 'alt', `illustration for ${title}`)}
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col sm:items-start items-center w-full">
              <h2 className="text-xs text-orange-300 uppercase font-semibold mb-2">
                {byline}
              </h2>
              <Link href={path}>
                <a
                  className="sm:text-2xl md:text-3xl text-xl font-extrabold leading-tighter hover:text-blue-300"
                  onClick={() =>
                    track('clicked jumbotron resource', {
                      resource: path,
                      linkType: 'text',
                    })
                  }
                >
                  <h1>{title}</h1>
                </a>
              </Link>
              <Link href={instructor.path}>
                <a
                  className="mt-4 flex items-center space-x-2 text-base group"
                  onClick={() =>
                    track('clicked instructor in jumbotron', {
                      instructor: instructor.slug,
                    })
                  }
                >
                  <Image
                    src={instructor.image}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={instructor.name}
                  />
                  <span className="group-hover:text-blue-200">
                    {instructor.name}
                  </span>
                </a>
              </Link>
              {description && (
                <Markdown
                  source={description}
                  className="mt-4 text-gray-200 text-base max-w-screen-sm"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <UniqueBackground className="absolute left-0 top-0 w-full h-full z-0 object-cover" />
    </div>
  )
}

const UniqueBackground = ({className}: any) => {
  return (
    <Image
      priority={true}
      quality={100}
      className={className}
      alt=""
      layout="fill"
      src={
        'https://res.cloudinary.com/dg3gyk0gu/image/upload/v1612373331/next.egghead.io/resources/introduction-to-cloudflare-workers-5aa3/introduction-to-cloudflare-workers-cover_2.png'
      }
    />
  )
}

export default Jumbotron
