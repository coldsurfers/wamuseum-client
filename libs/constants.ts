const IS_DEV = process.env.NODE_ENV === 'development'

export const urls = {
  apolloServer: IS_DEV
    ? 'http://localhost:3001/api/graphql'
    : 'https://api.billets-admin.coldsurf.io/api/graphql',
  fileUploadPresignedServer: IS_DEV
    ? 'http://localhost:3001/api/presigned'
    : 'https://api.billets-admin.coldsurf.io/api/presigned',
}
