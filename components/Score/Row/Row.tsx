import React from 'react'
import coin from '@images/icon-coin.svg'
import island from '@images/icon-island.svg'
import leader from '@images/icon-leader.svg'
import wonder from '@images/icon-wonder.svg'
import { Box } from 'rebass'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { useTheme } from 'emotion-theming'

interface ThemeObject {
    fontSizes: Array<String>
}
const Row = (props) => {
    const theme: ThemeObject = useTheme();
    console.log(props.theme);
    let {
        pointIndex,
        name,
        card,
        data,
        readOnly,
        totalRow,
        dispatch
    } = props;

    let iconDiv;
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

    const Row = styled.tr`
        font-size: ${(props: { totalRow: boolean }) => props.totalRow ? theme.fontSizes[4] + 'px' : theme.fontSizes[2] + 'px'};
    `

    const Cell = styled.td`
        background-color: ${(props: { isEvenRow?: boolean, color: string }) => props.isEvenRow ? props.color + '22' : props.color + '44'};
        text-align: center;
        input {
            background-color: transparent;
            text-align: center;
            &:focus {
                outline: none;
            }
        }
    `

    const cardStyle = css`
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
        iconDiv =
            <div css={css`
                    background-color: ${color};
                    ${cardStyle}
                   `}>
            </div>
    } else {
        const imageSrc = {
            coin: coin,
            leader: leader,
            armada: island,
            wonder: wonder
        };
        if (imageSrc[name]) {
            // Header with icon svg
            // A react component is a function, you want to call it.

            iconDiv = imageSrc[name]();
        } else {
            // Header with text
            iconDiv = <span>{name}</span>
        }
    }



    return (
        <Row totalRow={totalRow}>
            {/* First Column is Icon Column */}
            <Cell color={color}>
                {iconDiv}
            </Cell>
            {/* Second column onwards are score columns */}
            {/* If row is readOnly , use <span> */}
            {
                data.map((point, playerIndex) => readOnly ? (
                    <Cell key={`point-${playerIndex}-${[pointIndex]}`}
                        color={color} isEvenRow={parseInt(playerIndex) % 2 === 0}>
                        <span>{`${point}`}</span>
                    </Cell>
                ) : (
                        <Cell key={`point-${playerIndex}-${[pointIndex]}`}
                            color={color} isEvenRow={parseInt(playerIndex) % 2 === 0}>
                            <input type='text' value={point} onChange={(event) => handlePointChange(event, playerIndex, pointIndex)}
                                onKeyPress={(event) => filterInput(event)} />
                        </Cell>
                    ))
            }
        </Row>

    )
}

export default Row;
