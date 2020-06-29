import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { JSONFetcher } from '@library/fetchers.js'

const SetupPage = () => {
  const { data, error } = useSWR('/api/players', JSONFetcher);
  console.log('error', error);
  console.log('data', data);
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className="container">
      <Head>
        <title>Next 7 wonders app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Setup
        </h1>
        <h2>
          Choose players
        </h2>
        <ul>
          {data.map((item) => (<li key={item.data.name}>{item.data.name}</li>))}
        </ul>
        <button>
          <Link href="/score">
            <a className="description">
              Start game
            </a>
          </Link>
        </button>
        <hr/>
        <button className="description">
          Add Player
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

      <style jsx>{``}</style>
    </div>
  )
}

export default SetupPage