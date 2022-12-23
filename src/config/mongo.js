module.exports = {
    url: `mongodb://${process?.env?.MONGODB_HOST}:${process?.env?.MONGODB_PORT}`,
    username: process?.env?.MONGODB_USERNAME,
    password: process?.env?.MONGODB_PASSWORD,
    dbName: process?.env?.MONGODB_DATABASE,
};
