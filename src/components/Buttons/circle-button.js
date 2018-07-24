import React from 'react'
import './circle-button.css'

class CircleButton extends React.Component {
    render() {
        return <button onClick={this.props.onClick.bind(this)} className="circle-button">{this.props.children}</button>
    }
}

export default CircleButton