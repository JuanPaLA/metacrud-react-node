import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/shared/Home';
import  Header from './components/layout/Header';
import  Entity from './components/shared/DetailEntity';
import Footer from './components/layout/Footer';
import './components/components-styles.scss';
import ListContainer from './components/shared/ListContainer';

function App() {
  return (
    <main>
      <Provider store={store}>
        <BrowserRouter> 
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/:type/:layer" element={<ListContainer />} />
            <Route path="/detail-entity/:id/:type/:view" element={<Entity />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Provider>
    </main>    
  );
}

export default App;
