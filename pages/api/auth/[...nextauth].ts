import { NextApiRequest, NextApiResponse } from 'next'

import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { NextApiHandler } from "next"
import NextAuth from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import TwitterProvider from "next-auth/providers/twitter"
import bcrypt from "bcryptjs";
import prisma from '../../../lib/prisma'

const options = {
  providers: [
    // EmailProvider({
    //   server: process.env.NEXT_EMAIL_SERVER,
    //   from: process.env.NEXT_EMAIL_FROM,
    // }),
    // ! Burası çalışmıyor kontrol etmemiz gerekiyor.
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials){

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('No user found')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        console.log("isvalid : ",isValid)
        if (isValid) {
          console.log("user pass :", user.password)
          console.log("credentials", user)
          return user
        }else{
          console.log("invalid password")
          return Promise.resolve(null)
        }

      },
    }),
    // AppleProvider({
    //   clientId: process.env.NEXT_APPLE_ID,
    //   clientSecret: process.env.NEXT_APPLE_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   // @ts-ignore
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    // FacebookProvider({
    //   clientId: process.env.NEXT_FACEBOOK_ID,
    //   clientSecret: process.env.NEXT_FACEBOOK_SECRET,
    // }),
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_ID,
      clientSecret: process.env.NEXT_GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: "read:user",
    }),
    // GoogleProvider({
    //   clientId: process.env.NEXT_GOOGLE_ID,
    //   clientSecret: process.env.NEXT_GOOGLE_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.NEXT_TWITTER_ID,
    //   clientSecret: process.env.NEXT_TWITTER_SECRET,
    // }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.NEXT_JWT_SECRET,
  },
  pages: {
    signIn: '/auth/login',  // Displays signin buttons
    signOut: '/auth/login', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: ({ session, token }): any => {
      return {
        ...session,
        user: token.user,
      };
    },
  },

  events: {},
  debug: true,
  adapter: PrismaAdapter(prisma)
}


const authHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);
export default authHandler;