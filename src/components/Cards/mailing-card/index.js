import React from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import './mailing-card.css'
import * as moment from 'moment'
import 'moment/locale/ru'

class MailingCard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
    }

    renderMailingCard(mailing) {
        const classes = this.props.className ? this.props.className : ''
        const styles = this.props.style ? this.props.style : {}
        const status = mailing.statusId
        const statuses = [
            <span className="status-tag status-action">Рассылается</span>,
            <span className="status-tag status-success">Отправлено</span>,
            <span className="status-tag status-wait">Запланировано</span>,
        ]
        const dates = () => {
            const start = moment(mailing.startDate)
            const end = moment(mailing.endDate)
            const startF = start.format('DD MMMM hh:mm')
            const endF = end.diff(start, 'days') > 0 ? end.format('DD MMMM hh:mm') : end.format('hh:mm')
            const date = startF + ' - ' + endF
            return <span className="mailing-card-date pl-3">{date}</span>
        }
        return (
            <div className={classes + ' mailing-card'} style={{...styles}}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    {statuses[status]}
                    {dates()}
                </div>
                <div className="w-100 mb-3" style={{overflowX: 'auto'}}>
                    <div className="d-flex flex-nowrap">
                        <span className="tariff-tag mr-3">{mailing.alphaNumber}</span>
                    </div>
                </div>
                <h4 className="mb-3 mailing-card-name" title={mailing.name}>
                    {mailing.name}
                </h4>
                <p className="mb-0 mailing-card-text" title={mailing.originalText}>
                    {mailing.originalText}
                </p>
            </div>
        )
    }

    renderMock() {
        return (
            <div className="mailing-card-mock"/>
        )
    }

    render() {
        return this.props.mailing ? this.renderMailingCard(this.props.mailing) : this.renderMock()
    }

}

const mapStateToProps = ({ mailings }, ownProps) => ({
    mailing: mailings.list.find(mailing => mailing.id === ownProps.mailingId)
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailingCard)