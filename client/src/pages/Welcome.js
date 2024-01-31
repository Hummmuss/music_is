import React from 'react';
import "../styles/main.scss"

const Welcome = () => {
    return (
        <div className="wrap">
            <div className="headers">
                <h3>some inspiring text</h3>
                <h1>Music IS</h1>
            </div>
            <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    );
};

export default Welcome;