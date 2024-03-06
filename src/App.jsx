import { useRoutes } from 'react-router-dom';
import './App.css';
import FormRegister from './components/Form/Form';
import Users from './components/Users/Users';
import Header from './components/Navbar/Navbar';
import routes from './routes';



function App() {
  const router = useRoutes(routes)
  return (
    <>
      <Header />
      {router}
    </>
  );
}

export default App;