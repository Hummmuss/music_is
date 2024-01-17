import React, {useEffect, useState} from 'react';
import {getAllPlaylists} from "../http/API";
import '../styles/main.scss'
import Scrollbars from "react-custom-scrollbars-2";
import {NavLink} from "react-router-dom";


const Header = () => {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        const GetAndSetPlaylists = async () => {
            const allPlaylists = await getAllPlaylists();
            if (allPlaylists) {
                setPlaylists(allPlaylists);
            }
        };
        GetAndSetPlaylists()
    }, [])

    return (
        <div className="header">
                <div className="playlists-space">
                    {playlists &&
                        playlists.map((playlist) => (
                            <div className="item" key={playlist.id}>
                                {playlist.name}
                            </div>
                        ))}
                </div>
            <NavLink className="auth" to="/login">
                <div>
                    ♪ Log in ♪
                </div>
            </NavLink>
        </div>
    );
};

export default Header;