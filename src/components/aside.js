import React from 'react'
import {Menu as AsideMenu} from "element-react"
import './aside.css'
import {Link} from "react-router-dom";

class Aside extends React.Component {

    asideStyle = {
        minWidth: '80px',
        minHeight: '1px'
    }

    menuStyle = {
        top: '0',
        bottom: '0',
        margin: 'auto 0',
        position: 'absolute',
        borderRight: '1px solid #e6e8f1',
        background: '#FFF',
        width: '80px'
    }

    menuItemStyle = {
        padding: '0 25px'
    }

    asideContainerStyle  = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: '1029'
    }

    render() {
        return (
            <aside style={this.asideStyle}>
                <div style={this.asideContainerStyle}>
                    <AsideMenu defaultActive="/" className="d-flex flex-column justify-content-center" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} style={this.menuStyle}>
                        <Link to="/">
                            <AsideMenu.Item index="/" style={this.menuItemStyle}>
                                <i className="icomoon icon-home"/>
                                <span className="aside-title">Главная</span>
                            </AsideMenu.Item>
                        </Link>
                        <Link to="/search">
                            <AsideMenu.Item index="/search" style={this.menuItemStyle}>
                                <i className="icomoon icon-lupe"/>
                                <span className="aside-title">Поиск MT/MO</span>
                            </AsideMenu.Item>
                        </Link>
                        <Link to="/contact-book">
                            <AsideMenu.Item index="/contact-book" style={this.menuItemStyle}>
                                <i className="icomoon icon-phonebook"/>
                                <span className="aside-title">Адресная книга</span>
                            </AsideMenu.Item>
                        </Link>
                        <Link to="/mailing-lists">
                            <AsideMenu.Item index="/mailing-lists" style={this.menuItemStyle}>
                                <i className="icomoon icon-contacts"/>
                                <span className="aside-title">Рассылки</span>
                            </AsideMenu.Item>
                        </Link>
                        <Link to="/saved-groups">
                            <AsideMenu.Item index="/saved-groups" style={this.menuItemStyle}>
                                <i className="icomoon icon-saved"/>
                                <span className="aside-title">Сохраненная группы</span>
                            </AsideMenu.Item>
                        </Link>
                    </AsideMenu>
                </div>
            </aside>
        );
    }

    onOpen() {

    }

    onClose() {

    }
}
export default Aside;