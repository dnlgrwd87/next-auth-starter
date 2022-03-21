import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt_decode from 'jwt-decode';

const login = async (credentials): Promise<any> => {
  const { username, password } = credentials;
  const url = 'http://localhost:8000/auth/login/';

  try {
    const response = await axios.post(url, { username, password });
    return response.data;
  } catch (e) {}
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const token = await login(credentials);

        return token || null;
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/auth/signin',
  },
});
