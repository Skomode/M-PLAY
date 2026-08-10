import dotenv from 'dotenv';

interface IENV {
    PORT: string,
    MONGO_URI : string,
    JWT_SECRETWORD : string
}


dotenv.config();

export const ENV : IENV = {

    PORT: process.env.PORT || "",
    MONGO_URI : process.env.MONGO_URI || "",
    JWT_SECRETWORD : process.env.JWT_SECRETWORD || ""
}