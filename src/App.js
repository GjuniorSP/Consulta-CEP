

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './Services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    if (input === ''){
      alert('Preencha algum CEP')
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')
    }catch{
      alert('CEP não encontrado')
      setInput('')
    }

  }
  return (
    <div className="container">
      <h1 className="title">Consulta CEP</h1>
      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite seu cep..."
        value = {input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color="#FFF"/></button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>{cep.cep}</h2>
          <span>{cep.localidade} - {cep.uf}</span>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>Complemento: {cep.complemento}</span>
        </main>
      )}
    </div>
  );
}

export default App;
