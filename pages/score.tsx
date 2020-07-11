import Head from 'next/head'
import React, { useState } from 'react';

const ScorePage = ({ initialPlayers }) => {
  console.log('initialPlayers', initialPlayers);
  const [players, setPlayers] = useState(initialPlayers || []);

  return (
    <div className="container">
      <Head>
        <title>Next 7 wonders | Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Score
        </h1>

        <p className="description">
          Score table
        </p>
        {players && players.length > 0 && players.map((player, index) => <span key={index}>{player}</span>)}
        <button>
          <p className="description">
            Winner ?
        </p>
        </button>

        <button>
          <p className="description">
            Statistic
          </p>
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

export default ScorePage

export async function getServerSideProps({ query }) {
  return {
    props: { initialPlayers: JSON.parse(decodeURI(query.players)) }
  }
}