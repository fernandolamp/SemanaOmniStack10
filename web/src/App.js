import React, { useState, useEffect } from 'react';
import api from './services/api'
import './global.css';
import './Sidebar.css';
import './App.css';
import './Main.css'
import DevItem from './components/DevItem';
import DevForm from './components/DevForm'


function App() {


  const [devs, setDevs] = useState([]);

  async function handleAddDev(data) {    
    const response = await api.post('/devs',data)
    console.log(response.data);
    //copia todos devs, e adiciona a resposta no final em um novo array
    setDevs([...devs, response.data]);
  }


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);

    }

    loadDevs();
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}></DevItem>
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;
