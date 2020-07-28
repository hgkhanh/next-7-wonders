import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import useLocalStorageState from "use-local-storage-state";
import Score from '@components/Score';

const ScorePage = ({ initialPlayers }) => {
  console.log('initialPlayers', initialPlayers);
  // List of player who play this game
  const [playing, setPlaying] = useLocalStorageState('playing', []);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <h3>Loading...</h3>
    )
  }

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
        <hr/>
        <Score listOfPlayers={playing} />
        <hr/>
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