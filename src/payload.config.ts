// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import type { Plugin } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Header } from './globals/Header/config'
import { Pages } from './collections/Pages'
import { RoomRates } from './collections/RoomRates'
import { Documents } from './collections/Documents'
import { GenerateTitle, GenerateURL } from 'node_modules/@payloadcms/plugin-seo/dist/types'
import { Page } from './payload-types'
import { getServerSideURL } from './utilities/getURL'
import { Stories } from './collections/Stories'
import { Categories } from './collections/Categories'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Explorer Africa` : 'Explorer Africa'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, RoomRates, Documents, Stories, Categories],
  globals: [Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'clintmaruti@gmail.com',
    defaultFromName: 'Explorer Africa - Inquiry',
  }),
  plugins: [
    // Only use payloadCloudPlugin on the server side
    ...(typeof window === 'undefined' ? [payloadCloudPlugin()] : []),
    redirectsPlugin({
      collections: ['pages'],
    }),
    nestedDocsPlugin({
      collections: ['categories'],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
      uploadsCollection: 'media',
      generateTitle,
      generateURL,
      generateDescription: ({ doc }) => doc.excerpt,
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        email: true,
        message: true,
      },
      beforeEmail: (emailsToSend, beforeChangeParams) => {
        console.log('emailsToSend', emailsToSend)
        console.log('beforeChangeParams', beforeChangeParams)
        return emailsToSend
      },
      defaultToEmail: 'clintmaruti@gmail.com',
    }),
  ] as Plugin[],
})

// resendAdapter({
//   apiKey: process.env.RESEND_API_KEY || '',
//   defaultFromAddress: process.env.EMAIL_FROM || 'clintmaruti@gmail.com',
//   defaultFromName: 'Explorer Africa - Inquiry',
// })
