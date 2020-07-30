import Head from 'next/head'
import Link from 'next/link'
import Layout from '@components/Layout/Layout'

const HomePage = () => {
  return (
    <div className="container">
      <Head>
        <title>Next 7 wonders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Seven wonders app with <a href="https://nextjs.org">Next.js!</a>
        </h1>


        <Link href="/setup">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New game
          </button>
        </Link>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  )
}

export default HomePage