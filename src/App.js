import logo from './logo.svg';
import './App.scss';
import RecordTable from './components/tables/RecordTable';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <RecordTable/>
      <Footer/>
    </div>
  );
}

export default App;
