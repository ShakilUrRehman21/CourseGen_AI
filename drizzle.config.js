/** @type { import("drizzle-kit").Config} */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://AI-Course-Generator_owner:ouNaf8dhDIF0@ep-long-hall-a53ldoko.us-east-2.aws.neon.tech/AI-Course-Generator?sslmode=require'
    }
};
