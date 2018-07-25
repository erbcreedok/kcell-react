import React from 'react'
import './circle-button.css'

class CircleButton extends React.Component {
    render() {
        const classes = this.props.className ? this.props.className : ''
        const styles = this.props.style ? this.props.style : {}
        return <button onClick={this.props.onClick.bind(this)}
                       className={classes + ' circle-button'}
                       style={{...styles}}
        >{this.props.children}</button>
    }
}

export default CircleButton