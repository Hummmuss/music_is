import React, {useEffect, useState} from 'react';
import {getAllPlaylistsByUser} from "../http/API";
import '../styles/main.scss'
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react";

const Header = observer(({user}) => {
    const [playlists, setPlaylists] = useState([])
    console.log("header rerender!")
    useEffect(() => {
        const GetAndSetPlaylists = async () => {
            const allPlaylists = await getAllPlaylistsByUser(user.userId);

            if (allPlaylists) {
                setPlaylists(allPlaylists);
            }
        };
        GetAndSetPlaylists()

    }, [user.userId])

    return (
        <div className="header">
            <div className="playlists-space">
                {(user.isAuth && playlists) &&
                    playlists.map((playlist) => (
                        <div className="item" key={playlist.id}>
                            {playlist.name}
                        </div>
                    ))}

            </div>
            {user.isAuth ?
                <NavLink className="auth" to="/account">
                    <div>
                        ♪ Account ♪
                    </div>
                </NavLink>
                :
                <NavLink className="auth" to="/login">
                    <div>
                        ♪ Log in ♪
                    </div>
                </NavLink>
            }
        </div>
    );

});

export default Header;