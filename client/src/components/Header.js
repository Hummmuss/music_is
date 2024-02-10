import React from 'react';
import '../styles/main.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
    const isAuth =  useSelector(state => state.isAuth);
    const playlists = useSelector(state => state.playlists)
    console.log(playlists)


    return (
        <div className="header">
            <div className="playlists-space">
                {
                    playlists.map((playlist) => (
                        <div className="item" key={playlist.id}>
                            {playlist.name}
                        </div>
                    ))
                }
            </div>
            {isAuth ?
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

};

export default Header;