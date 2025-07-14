import Layout from './Layout/Layout';
import Header from './Layout/Header/Header';
import Main from './Layout/Main/Main';
import Footer from './Layout/Footer/ButtonFooter';
import { Provider } from 'react-redux';
import { store } from './Api/Store';


function App() {

  return (
    <>
        <Provider store={store}>
            <Layout>
                <Header />
                <Main />
                <Footer />
            </Layout>
        </Provider>
    </>
  )
}

export default App;
