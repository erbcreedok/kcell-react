import React from 'react'
import {Breadcrumb} from "element-react";
import {withRouter, Link} from "react-router-dom";
import './Breadcrumps.css';

class Breadcrumbs extends React.Component {

    componentDidMount() {
        withRouter(props => {
            console.log(props)
        })
    }

    render() {
        return (
            <div className="breadcrumbs">
                <div className="mb-3">
                    <Link to='/' className="go-back">⇽ Назад</Link>
                </div>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    <Breadcrumb.Item>Адресная книга</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }

}
export default Breadcrumbs;