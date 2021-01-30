import './App.scss';
import Table from './table.js';
import sampleData from './sampleData.json';

const App = () => {
  return (
    <div className="App">
      <header className="App-headers">
       <b>Sample Data</b>
       </header>
        <Table data={sampleData}/>
      
    </div>
  );
}

export default App;
