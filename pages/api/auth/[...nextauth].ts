import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt_decode from 'jwt-decode';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials;
          const url = 'http://localhost:8000/auth/login/';

          const response = await axios.post(url, { username, password });
          return response.data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
      }

      return token;
    },
    async session({ session, token }) {
      const { accessToken } = token;
      const { username } = jwt_decode<{ username: string }>('' + accessToken);

      session.username = username;
      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
