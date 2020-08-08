import Head from 'next/head'
import useSWR, { mutate } from 'swr'
import fetch from 'unfetch'
import Setup from '@components/Setup'

const playersAPI = '/api/players';

const SetupPage = () => {
  const getPlayers = async (key) => {
    const response = await fetch(key);
    const data = await response.json();
    return data[0] && data[0].data ? data[0].data.players : {};
  };

  const updatePlayers = async (players) => {
    const response = await fetch(playersAPI, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        players: players
      })
    });
    const data = await response.json();
    console.log('updatePlayers', data);
    return data.players ? [...data.players] : [];
  };

  const updatePlayerData = async (newPlayerData) => {
    console.log('updatePlayerData', newPlayerData);
    // Mutate will make the change to local data
    // Even if the submit is slow, data in UI is update instantly
    // shouldRevalidate == false: when data is submitted, there is no recheck
    mutate(playersAPI, [...newPlayerData], false);
    mutate(playersAPI, await updatePlayers(newPlayerData));
  };


  const { data, error } = useSWR(playersAPI, getPlayers);
  if (error) return <div>{error}</div>
  if (!data) return <div>loading...</div>
  if (data && data.length > 0) {
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
          <Setup players={data} updatePlayerData={(data) => updatePlayerData(data)} />
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
  return <div>failed to load</div>;
}

export default SetupPage