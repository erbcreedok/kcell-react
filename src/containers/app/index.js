import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Header from "../../components/header";
import Aside from "../../components/aside";
import Breadcrumbs from "../../components/Breadcrumps/Breadcrumbs";
import ContactBook from "../contact-book";
import MailingLists from "../mailing-lists";
import SavedGroups from "../saved-groups";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import './app.css'

const App = (props) => (
  <div className="app">
    <Header/>
    <div className="d-flex">
        <Aside/>
        <main className={'main-container py-5 ' + props.className} style={{...props.styles, overflow: 'visible', padding: '0 50px', width: '100%', minHeight: '100vh'}}>
            <Breadcrumbs/>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/search" component={About} />
            <Route exact path="/contact-book" name="Контактная книга" component={ContactBook} />
            <Route exact path="/mailing-lists" name="Рассылки" component={MailingLists} />
            <Route exact path="/saved-groups" name="Сохраненные группы" component={SavedGroups} />
        </main>
    </div>
  </div>
)

const mapStateToProps = ({ body }) => ({
    styles: body.styles,
    className: body.className,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {},
        dispatch
    )

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
