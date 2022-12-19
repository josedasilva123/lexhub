import './App.css';
import { UserProvider } from './contexts/UserContext';
import RoutesMain from './routes';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RoutesMain />
      </UserProvider>      
    </div>
  );
}

export default App;
