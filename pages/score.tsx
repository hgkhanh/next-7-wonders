import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import Score from '@components/Score';
import { Flex } from 'rebass';

const ScorePage = ({ initialPlayers }) => {
  const router = useRouter();
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

  const startNewGame = () => {
    router.push('/setup');
  }

  return (
    <div className='container'>
      <Head>
        <title>Next 7 wonders | Score</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>
          Score
        </h1>
        <hr />
        <Flex>
          <Score listOfPlayers={playing} startNewGame={startNewGame} />
        </Flex>
      </main>

      <footer>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className='logo' />
        </a>
      </footer>
    </div >
  )
}

export default ScorePage