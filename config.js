module.exports = {
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.MONGODB_URL,
    mongoURI: `${process.env.MONGODB_URL}`,
    port: process.env.PORT,
  }
  