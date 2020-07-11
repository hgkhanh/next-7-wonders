import Head from 'next/head'
import React, { useState } from 'react';
import useLocalStorageState from "use-local-storage-state";

const ScorePage = ({ initialPlayers }) => {
  console.log('initialPlayers', initialPlayers);
  // List of player who play this game
  const [playing, setPlaying] = useLocalStorageState('playing', []);

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
        {JSON.stringify(playing)}

        <p className="description">
          Score table
        </p>
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