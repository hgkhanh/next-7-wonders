import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import fetch from 'unfetch'
import { Fragment, useReducer, useState, useEffect } from 'react'

/**
 * Maintain a state: players = {}
 * This will be display to the UI
 * Only when exiting edit mode, we submit the change to DB (updatePlayerData) 
 */
const Player = (props) => {
    const playersReducer = (playersState, action) => {
        let newPlayersState;
        switch (action.type) {
            case 'setName':
                newPlayersState = [...playersState];
                playersState[action.playerNumber].name = action.name;
                return newPlayersState;
            case 'addPlayer':
                return [...playersState, { name: 'player' }];
            case 'removePlayer':
                newPlayersState = [...playersState.filter(
                    (player, index) => index !== action.playerNumber
                )];
                return newPlayersState;
            default:
                return playersState
        }
    }
    const [players, dispatch] = useReducer(playersReducer, props.players || null);
    const [isEditMode, setEditMode] = useState(false);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        // If toggle to false, update the player list in db
        if (!isEditMode && isMounted) {
            console.log('isEditMode', 'toggle to ' + isEditMode);
            console.log('players', players);
            props.updatePlayerData(players);
        }
    }, [isEditMode])

    useEffect(() => {
        setMounted(true);
    }, [])

    console.log('Players props', props);
    if (players) {
        return (
            <Fragment>
                <div className="block">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-8 w-8"
                            value={`${isEditMode}`} onChange={() => setEditMode(!isEditMode)} />
                        <span className="ml-4 text-xl">Edit</span>
                    </label>
                </div>

                {!isEditMode && (
                    <Fragment>
                        <h2>
                            Choose players
                    </h2>
                        <ul>
                            {props.players && props.players.length > 0 && props.players.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </Fragment>
                )}
                {isEditMode && (
                    <Fragment>
                        <h2>
                            Edit players
                        </h2>
                        <ul>
                            {players.map((item, index) => (
                                <Fragment key={`edit-${index}`}>
                                    <li>
                                        <input type="text" value={item.name}
                                            onChange={event => dispatch({
                                                type: 'setName',
                                                playerNumber: index,
                                                name: event.target.value
                                            })} />
                                    </li>
                                    <button onClick={() => dispatch({ type: 'removePlayer', playerNumber: index })}>Delete</button>
                                </Fragment>
                            ))}
                        </ul>
                        <button className="description" onClick={() => dispatch({ type: 'addPlayer' })}>
                            Add Player
                        </button>
                    </Fragment>
                )}
                {!isEditMode && (
                    <button>
                        <Link href={{
                            pathname: "/score",
                            query: {
                                players: encodeURI(JSON.stringify(players.map((player) => player.name)))
                            }
                        }}>
                            <a className="description">
                                Start game
                        </a>
                        </Link>
                    </button>
                )}
            </Fragment>
        )
    } else {
        return (<div></div>);
    }
}

export default Player