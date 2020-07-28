import React, { useContext, useState, useReducer, useEffect } from 'react';
import Row from './Row';
import Category from '@config/Category';
const Scoresheet = ({ listOfPlayers }) => {
    const blankPlayer = {
        name: 'p1',
        score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    const [isError, setError] = useState(false);

    /**
     * Handle action to main app object - players
     */
    const playersReducer = (playersState, action) => {
        switch (action.type) {
            case 'setPoints':
                console.log('Set a single point field');
                return playersState.map((player, index) => {
                    if (index === action.playerNumber) {
                        let score = [...player.score];
                        score[action.column] = action.point;
                        player.score = [...score];
                    }
                    return player;
                });
            case 'addPlayer':
                let playerObject = blankPlayer;
                playerObject.name = action.name;
                return [...playersState, { ...playerObject }];
            default:
                return playersState;
        }
    };

    /**
     * Main object of this component
     * An array of players
     * Each player object hold score of the individual
     */
    const [players, dispatch] = useReducer(playersReducer, []);

    /**
     * Init players (main component object) from list of players from props
     */
    useEffect(() => {
        if (listOfPlayers) {
            listOfPlayers.forEach(name => {
                dispatch({
                    type: 'addPlayer',
                    name: name
                });
            });
        }
    }, []);

    const saveScore = () => {
        console.log('save score');
        // const documentRef = db.collection('game').doc(gameId);
        // documentRef.set(
        //     {
        //         room: room,
        //         players: players
        //     },
        //     {
        //         merge: true
        //     }
        // )
        //     .then(function () {
        //         console.log('Score successfully saved!');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    };

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
        const data = players.map(player => {
            // Calculate sum of point
            return player.score.reduce((accumulator, point) => {
                return point === '' ? accumulator : accumulator + parseInt(point)
            }, 0);
        });
        return (
            <Row name='Σ' data={data} readOnly={true} totalRow={true} />
        );
    };

    if (isError) {
        return (
            <h3>Game not found!</h3>
        )
    }
    return (
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
    );
};

export default Scoresheet;
