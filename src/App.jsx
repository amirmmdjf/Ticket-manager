import { useRoutes } from 'react-router-dom';
import './App.css';
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