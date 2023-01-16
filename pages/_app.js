import Head from 'next/head'
import Layout from '../components/Layout'
import { AuthProvider } from '../context/auth/authContext'
import { AppProvider } from '../context/app/appContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
      <Head>
            <title>NodeSentNext</title>
      </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </AuthProvider> 
  )
}
