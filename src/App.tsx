import { ReactComponent as LogoIcon } from './assets/svg/Logo_Icon.svg'
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes'
import store from './store';


function App() {
  return (
    <div className="app">
    <Provider store={store}>
      <BrowserRouter>
        <LogoIcon className='logo-header-icon' />
          <Router />
        <Footer />
      </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
