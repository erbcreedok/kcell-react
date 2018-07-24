import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Header from "../../components/header";
import Aside from "../../components/aside";
import Breadcrumbs from "../../components/Breadcrumps/Breadcrumbs";
import ContactBook from "../contact-book/ContactBook";

const App = () => (
  <div className="app">
    <Header/>
    <div className="d-flex">
        <Aside/>
        <div style={{padding: '0 50px', width: '100%'}}>
            <main className="py-5" style={{overflow: 'visible'}}>
                <Breadcrumbs/>
                <Route exact path="/" component={Home} />
                <Route exact path="/about-us" component={About} />
                <Route exact path="/search" component={About} />
                <Route exact path="/contact-book" name="Контактная книга" component={ContactBook} />
                <Route exact path="/contact-book" name="Контактная книга" component={ContactBook} />
            </main>
        </div>
    </div>
  </div>
)

export default App
