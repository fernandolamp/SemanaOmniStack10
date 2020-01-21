import React, { useState, useEffect } from 'react';

import "./style.css";

function DevForm(props) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const [techs, setTechs] = useState('');
    const [github_username, setGithub_username] = useState('');
    
    // permite executar uma função sempre que algo for alterado, se o segundo argumento
    //for vazio, vai ser executado uma única vez  
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
    
        }, (error) => {
            console.log(error);
        },
            {
                timeout: 30000,
            }
        );
    }, []);
    
    const { onSubmit } = props;

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        //limpar os campos 
        setGithub_username('');
        setTechs('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username"> usuário do github </label>
                <input
                    name="github_username"
                    id="username_github"
                    required
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)}
                ></input>
            </div>

            <div className="input-block">
                <label htmlFor="techs"> Tecnologias </label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                ></input>
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude"> latitude </label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    >

                    </input>
                </div>
                <div className="input-block">
                    <label htmlFor="longitude"> longitude </label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    >
                    </input>
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;    