import './App.scss';
import GetMessage from './components/GetMessage';
import SendMessage from './components/SendMessage';

function App() {
  return (
    <div className="App">
      <SendMessage/>
      <hr/>
      <GetMessage/>
    </div>
  );
}

export default App;
