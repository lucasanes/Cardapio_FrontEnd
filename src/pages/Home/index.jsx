import { useAuth } from '../../contexts/auth';
import {Container} from './styles'
import {useEffect} from 'react'

export function Home() {

  const {signIn} = useAuth()

  useEffect(() => {
    
    signIn({username: 'lucas', senha: '123'})

  }, [])
  

  return (
    <Container>
      <span>teste</span>
    </Container>
  );
}