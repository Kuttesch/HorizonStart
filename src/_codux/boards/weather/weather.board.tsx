import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Weather from '../../../components/weather.jsx';

export default createBoard({
    name: 'Weather',
    Board: () => <Weather />,
    isSnippet: true,
});
