
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {

    try {
      const { data } = await api.get(`repos/${currentRepo}`)
      if (data.id) {

        const isExist = repos.find(repo => repo.id === data.id);

        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('')
          return
        }
        alert('Repositório já existe');
      }
    } catch (e) {
      if (e.message.includes('404')) {
        alert('Digite um nome de repositório valído: \n joao/meusite')
      } else {
        alert('Erro: ' + e)
      }
    }

  }

  const handleRemoveRepo = (id) => {
    // saber o id 
    const update = repos.filter(rep => rep.id !== id);
    setRepos(update);
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
