import NextAuth from "next-auth/next";
import Providers from 'next-auth/providers'
import GoogleProvider from "next-auth/providers/google";
interface props {
    clientId:any,
    clientSecret:any,
}
export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID? process.env.GOOGLE_CLIENT_ID: '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET? process.env.GOOGLE_CLIENT_SECRET: ''
          })    
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async redirect({ baseUrl }) {
            return baseUrl
          }
    }
})