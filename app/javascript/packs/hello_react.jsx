import React from 'react';
import ReactDOM from 'react-dom';

const Hello = props => (
    <div>
        <h1>Hello, World</h1>
    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Hello/>,
        document.body.appendChild(document.createElement('div')),
    )
})