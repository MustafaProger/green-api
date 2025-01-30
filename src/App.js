import './App.scss';
import GetMessage from './components/GetMessage';
import LoginForm from './components/logIn/LogForm';
import SendMessage from './components/SendMessage';

function App() {
  return (
    <div className="App">
      <SendMessage/>
      <hr/>
      <GetMessage/>
      <hr/>
      <LoginForm/>
    </div>
  );
}

export default App;
