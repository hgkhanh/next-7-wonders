import React from 'react';
import coin from '@images/icon-coin.svg';
import island from '@images/icon-island.svg';
import leader from '@images/icon-leader.svg';
import wonder from '@images/icon-wonder.svg';
import styled from 'styled-components'

const Row = (props) => {
    let {
        pointIndex,
        name,
        card,
        data,
        readOnly,
        totalRow,
        dispatch
    } = props;

    let color = props.color || '#000000';
    const handlePointChange = (event, playerId, columnIndex) => {
        dispatch(
            {
                type: 'setPoints',
                playerNumber: playerId,
                column: columnIndex,
                point: formatInput(event.target.value)
            }
        );
    };

    const filterInput = (event) => {
        const regexChar = /[0-9-]/g;
        if (!regexChar.test(event.key)) {
            event.preventDefault();
        }
    };

    const formatInput = (value) => {
        if (value === '-') {
            return '-';
        } else if (value === '') {
            return '';
        }
        return parseFloat(value);
    };

    const imageSrc = {
        coin: coin,
        leader: leader,
        armada: island,
        wonder: wonder
    };

    let iconDiv;
    const Row = styled.td`
        background-color: ${props => props.isEvenRow ? props.color + "22" : props.color + "44"};
        text-align: center;
        input {
            background-color: transparent;
            text-align: center;
            &:focus {
                outline: none;
            }
        }
    `;

    const Cell = styled.div`
        background-color: ${props.color};
    `;

    const CardCell = styled(Cell)`
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
    `;

    // There are 3 type of row Header
    if (card) {
        // Header with card image
        iconDiv = (<CardCell color={color}></CardCell>)
    } else {
        if (imageSrc[name]) {
            // Header with icon svg
            // A react component is a function, you want to call it.
            iconDiv = imageSrc[name]();
        } else {
            // Header with text
            iconDiv = <Cell color={color}>{name}</Cell>
        }
    }



    return (
        <tr className={totalRow ? 'total' : ''}>
            {/* First Column is Icon Column */}
            <Row color={color}>
                {iconDiv}
            </Row>
            {/* Second column onwards are score columns */}
            {/* If row is readOnly , use <span> */}
            {
                data.map((point, playerIndex) => readOnly ? (
                    <Row key={`point-${playerIndex}-${[pointIndex]}`}
                        color={color} isEvenRow={parseInt(playerIndex) % 2 === 0}>
                        <span>{`${point}`}</span>
                    </Row>
                ) : (
                        <Row key={`point-${playerIndex}-${[pointIndex]}`}
                            color={color} isEvenRow={parseInt(playerIndex) % 2 === 0}>
                            <input type='text' value={point} onChange={(event) => handlePointChange(event, playerIndex, pointIndex)}
                                onKeyPress={(event) => filterInput(event)} />
                        </Row>
                    ))
            }
        </tr >

    )
}

export default Row;
