import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useReducer, useState, useEffect } from 'react'
import useLocalStorageState from "use-local-storage-state";

// interface PlayerList {
//     name: string,
//     active: boolean
// }
/**
 * Maintain a state: players = {}
 * This will be display to the UI
 * Only when exiting edit mode, we submit the change to DB (updatePlayerData) 
 */
const Player = (props) => {
    const router = useRouter()

    // List of player who play this game
    const [playing, setPlaying] = useLocalStorageState('playing', []);
    const playersReducer = (playersState, action) => {
        let newPlayersState;
        switch (action.type) {
            case 'setName':
                newPlayersState = [...playersState];
                playersState[action.playerNumber].name = action.name;
                return newPlayersState;
            case 'addPlayer':
                return [...playersState, { name: 'player', active: true }];
            case 'removePlayer':
                newPlayersState = [...playersState.filter(
                    (player, index) => index !== action.playerNumber
                )];
                return newPlayersState;
            case 'setActive':
                newPlayersState = [...playersState];
                playersState[action.playerNumber].active = action.active;
                setPlaying(newPlayersState.filter((player) => player.active).map(item => item.name));
                return newPlayersState;
            default:
                return playersState
        }
    }
    const initialPlayersSet = props.players.map((player) => {
        return {
            name: player.name,
            active: false
        }
    });
    const [players, dispatch] = useReducer(playersReducer, initialPlayersSet || null);
    const [isEditMode, setEditMode] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const [localScore, setScore] = useLocalStorageState('score', []);

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
    }, []);

    const startGame = () => {
        // clear score from last game
        setScore([]);
        // Navigate to /score
        router.push('/score');
    }

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
                            {players && players.length > 0 && players.map((item, index) => (
                                <div key={index}>
                                    <label>
                                        <input type="checkbox" checked={item.active}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({
                                                type: 'setActive',
                                                playerNumber: index,
                                                active: event.target.checked
                                            })} />
                                        {item.name}
                                    </label>
                                </div>
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
                    <button onClick={startGame}>
                        Start game
                    </button>
                )}
            </Fragment>
        )
    } else {
        return (<div></div>);
    }
}

export default Player