declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;

    POSTGRES_HOST: string;

    POSTGRES_PORT: string;

    POSTGRES_USER: string;

    POSTGRES_PASSWORD: string;

    POSTGRES_DB: string;

    POSTGRES_URL: string;

    JWT_SECRET: string;

    JWT_EXPIRES_IN: string;

    MAIL_HOST: string;

    MAIL_PORT: string;

    MAIL_USER: string;

    MAIL_PASS: string;

    MAIL_FROM: string;

  }
}
