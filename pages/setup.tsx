import Head from 'next/head'
import useSWR, { mutate } from 'swr'
import fetch from 'unfetch'
import Player from '@components/Player'

const playersAPI = '/api/players';

const SetupPage = () => {
  const getPlayers = async (key) => {
    const response = await fetch(key);
    const data = await response.json();
    return data[0] ? data[0].data : {};
  };

  const updatePlayerData = async (newPlayerData) => {
    console.log('updatePlayerData', newPlayerData);
    const response = await fetch(playersAPI, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        players: newPlayerData
      }),
    });
    mutate(playersAPI, { ...newPlayerData });
    return await response.json();
  };


  const { data, error, mutate } = useSWR(playersAPI, getPlayers);
  console.log('data', data);
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (data) {
    return (
      <div className="container">
        <Head>
          <title>Next 7 wonders | Setup</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Setup
          </h1>
          <Player players={data.players} updatePlayerData={(data) => updatePlayerData(data)} />
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
}

export default SetupPage