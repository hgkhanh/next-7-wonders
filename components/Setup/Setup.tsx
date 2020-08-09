import { useRouter } from 'next/router'
import { Fragment, useReducer, useState, useEffect } from 'react'
import useLocalStorageState from "use-local-storage-state"
import { Button, Flex, Box } from 'rebass'
import { Label, Checkbox, Input } from '@rebass/forms'

// interface PlayerList {
//     name: string,
//     active: boolean
// }
/**
 * Maintain a state: players = {}
 * This will be display to the UI
 * Only when exiting edit mode, we submit the change to DB (updatePlayerData) 
 */
const Setup = (props) => {
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

    if (players) {
        return (
            <Flex flexWrap='wrap' justifyContent='center' my={2} textAlign='center'>
                <Box width={1} my={2}>
                    <Label justifyContent='center' fontSize={3}>
                        <Checkbox sx={{
                            transform: 'scale(2)'
                        }} mr={3}
                            value={`${isEditMode}`} onChange={() => setEditMode(!isEditMode)} />
                        Edit
                    </Label>
                </Box>
                {!isEditMode && (
                    <Box width={1} my={2}>
                        <Box as='h2' my={2}>
                            Choose players
                        </Box>
                        <Box as='ul' width={1}>
                            <Box sx={{
                                display: 'inline-block',
                                textAlign: 'left'
                            }}>
                                {players && players.length > 0 && players.map((item, index) => (
                                    <div key={index}>
                                        <label>
                                            <input type="checkbox" checked={item.active}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({
                                                    type: 'setActive',
                                                    playerNumber: index,
                                                    active: event.target.checked
                                                })} className="mr-2" />
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                )}
                {isEditMode && (
                    <Box width={1} my={2}>
                        <Box as='h2' my={2}>
                            Edit players
                        </Box>
                        <Box as='ul' width={1}>
                            {players.map((item, index) => (
                                <Flex as='li' flexWrap='wrap'key={`edit-${index}`} my={2} justifyContent='center'>
                                    <Input type="text" value={item.name} width={1 / 2}
                                        sx={{ display: 'inline-block' }}
                                        onChange={event => dispatch({
                                            type: 'setName',
                                            playerNumber: index,
                                            name: event.target.value
                                        })} />
                                    <Button ml={2} sx={{ display: 'inline-block' }}
                                        variant='outline'
                                        onClick={() => dispatch({ type: 'removePlayer', playerNumber: index })}>Delete</Button>
                                </Flex>
                            ))}
                        </Box>
                        <Box width={1}>
                            <Button m={2}
                                onClick={() => dispatch({ type: 'addPlayer' })}>
                                Add Player
                            </Button>
                        </Box>
                    </Box>
                )}
                <Box width={1}>
                    {!isEditMode && (
                        <Button m={2} onClick={startGame}>
                            Start game
                        </Button>
                    )}
                </Box>
            </Flex>
        )
    } else {
        return (<div></div>);
    }
}

export default Setup