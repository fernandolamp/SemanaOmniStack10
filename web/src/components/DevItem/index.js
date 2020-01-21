import React from 'react';
import './style.css';

function DevItem({dev}){
    return(
            <li className="dev-item">
              <header>
                <img src={dev.avatar_url} alt=""></img>
                <div className="user-info">
                  <strong>{dev.github_username}</strong>
                  <span>{dev.techs.join(',')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`http://github.com/${dev.github_username}`}>Acessar perfil no github</a>
            </li>
    )
}

export default DevItem;
