import Head from 'next/head'
import Link from 'next/link'
import Layout from '@components/Layout/Layout'

const HomePage = () => {
  return (
    <div className="container">
      <Head>
        <title>Next 7 wonders app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Seven wonders app with <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <button>
          <Link href="/setup">
            <a className="description">
              New game
            </a>
          </Link>
        </button>
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