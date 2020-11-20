import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import Header from './components/header';
import Footer from './components/footer';
import Error404 from './pages/error404';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>          
                <Route path="/" component={Home} exact/>
                <Route path="/produtos/:lat/:lng" component={Products} /> 
                <Route path="*" component={Error404}/> 
            </Switch>
            <Footer/>
        </BrowserRouter>
    );
}

export default Routes;