import NextAuth, { Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

interface IGoogleProfile {
  email: string;
  email_verified: boolean;
  name: string;
  picture: `https://${string}`;
  given_name: string;
  family_name: string;
  locale: string; // Two character lowercase
  iat: number;
  exp: number;
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw Error(
    'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be defined in environment'
  );
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const googleProfile = profile as Profile & IGoogleProfile;
      if (account.provider === 'google') {
        return googleProfile.email_verified === true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
