import React, { useContext, useState, useReducer, useEffect } from 'react';
import Row from './Row';
import Category from '@config/Category';
import useLocalStorageState from 'use-local-storage-state';
import { Button, Flex, Box } from 'rebass';
import _ from 'lodash';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Scoresheet = ({ listOfPlayers, startNewGame }) => {
    const blankPlayer = {
        name: 'p1',
        score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    const [isError, setError] = useState(false);
    const [isShowWinner, setShowWinner] = useState(false);
    const [winnerText, setWinnerText] = useState('');
    const { width, height } = useWindowSize();

    /**
     * Handle action to main app object - players
     */
    const playersReducer = (playersState, action) => {
        switch (action.type) {
            case 'setPoints':
                console.log('Set a single point field');
                let resultState = playersState.map((player, index) => {
                    if (index === action.playerNumber) {
                        let score = [...player.score];
                        score[action.column] = action.point;
                        player.score = [...score];
                        player.total = _.sum(player.score);
                    }
                    return player;
                });

                // save to localStorage
                setScore(resultState);
                return resultState;
            case 'addPlayer':
                let playerObject = blankPlayer;
                playerObject.name = action.name;
                return [...playersState, { ...playerObject }];
            default:
                return playersState;
        }
    };

    const [localScore, setScore] = useLocalStorageState('score', []);
    /**
     * Main object of this component
     * An array of players
     * Each player object hold score of the individual
     */
    const [players, dispatch] = useReducer(playersReducer, localScore.length > 0 ? localScore : []);

    const showWinner = () => {
        // Check if all has score
        const allHasScore = players.every((player) => {
            return player.total > 0;
        }, [])
        if (allHasScore) {
            // all has score, show the winner
            // find max
            const highestScore = _.maxBy(players, 'total').total;
            // check draw
            const winners = players.filter(player => {
                return player.total == highestScore;
            });
            const winnerNames = _.join(_.map(winners, 'name'), ' and ');
            setWinnerText(winnerNames + ' won with ' + highestScore + ' pts!');
            setShowWinner(true);
        }
    }

    /**
     * Init players (main component object) from list of players from props
     */
    useEffect(() => {
        if (listOfPlayers && localScore.length === 0) {
            listOfPlayers.forEach(name => {
                dispatch({
                    type: 'addPlayer',
                    name: name
                });
            });
        }
    }, []);

    /**
     * RENDER FUNCTIONS
     */
    const renderPlayerName = (player, playerId) => {
        return (
            <th key={`player-${playerId}`} className={`cell playerName`}>
                <span>{player.name}</span>
            </th>
        )
    };

    // A row show score in one category - identified by categoryIndex
    const renderRow = (category, categoryIndex) => {
        // Data: an array of scores of all players in that category
        const data = players.map(player => player.score[categoryIndex]);
        return (
            <Row key={category.name} pointIndex={categoryIndex} name={category.name}
                color={category.color} card={category.card} data={data} dispatch={dispatch} />
        );
    };

    // A row show total scores of all player
    const renderRowTotal = () => {
        // Data: an array of total scores of all players
        const sumArray = players.map(player => {
            return player.total;
        });
        return (
            <Row name='Σ' data={sumArray} readOnly={true} totalRow={true} />
        );
    };

    const WinnerOverlay = () => {
        if (isShowWinner) {
            return (
                <Box
                    sx={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Confetti
                        width={width}
                        height={height}
                    />
                    <Flex flexWrap='wrap' justifyContent='center' my={2} textAlign='center'
                        flexDirection='column' height='100vh' color='light' fontSize={[4, 6, 8]}>
                        {winnerText}
                    </Flex>
                </Box>
            )
        }
        return null;

    }
    if (isError) {
        return (
            <h3>Game not found!</h3>
        )
    }
    return (
        <React.Fragment>
            <WinnerOverlay />
            <Flex flexDirection='column'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {players.map((player, playerId) => renderPlayerName(player, playerId))}
                        </tr>
                    </thead>
                    <tbody>
                        {Category.map((category, index) => renderRow(category, index))}
                        {renderRowTotal()}
                    </tbody>
                </table>
                <hr />
                <Flex flexWrap='wrap' justifyContent='center' my={2} textAlign='center'>
                    <Box width={1 / 2} p={2}>
                        <Button variant='primary' onClick={showWinner} width={1}>
                            Winner ?
                </Button>
                    </Box>
                    <Box width={1 / 2} p={2}>
                        <Button variant='secondary' onClick={startNewGame} width={1}>
                            New Game !
                </Button>
                    </Box>

                    <Box width={1} p={2}>
                        <Button variant='outline' width={1}>
                            Statistic
                </Button>
                    </Box>
                </Flex>
            </Flex>
        </React.Fragment>
    );
};

export default Scoresheet;
