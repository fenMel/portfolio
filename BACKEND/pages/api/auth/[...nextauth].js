// pages/api/auth/[...nextauth].js
import connectToDatabase from '@/lib/mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          // Connexion à la base de données
          const db = await connectToDatabase();
          const collection = db.collection('admin');

          // Recherche de l'utilisateur par email
          const user = await collection.findOne({ email: credentials.email });

          if (!user) {
            console.error('User not found');
            throw new Error('Invalid email or password');
          }

          // Vérification du mot de passe en texte clair
          if (credentials.password !== user.password) {
            console.error('Invalid password');
            throw new Error('Invalid email or password');
          }

          // Renvoi de l'utilisateur si tout est correct
          console.log('Authentication successful:', user.email);
          return { id: user._id, email: user.email };

        } catch (error) {
          console.error('Error in authorize:', error.message);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Ajout de l'ID utilisateur au token
      if (user) {
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Ajout de l'ID utilisateur à la session
      if (token) {
        session.user._id = token._id;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin', // Page personnalisée de connexion
  },

  secret: process.env.NEXTAUTH_SECRET, // Secret pour sécuriser NextAuth
});
