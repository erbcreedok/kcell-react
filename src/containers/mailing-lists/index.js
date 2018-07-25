import React from 'react'
import {Dialog, Loading} from "element-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CircleButton from "../../components/Buttons/circle-button";
import {loadMailings} from "../../modules/mailings";
import MailingCard from "../../components/Cards/mailing-card";
import NewMailing from "../../components/Forms/NewMailing";

class MailingLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false
        }
    }

    componentWillMount() {
        if (!this.props.isDirty) {
            this.props.loadMailings()
        }
    }

    render () {
        return (
            <div className="contact-book" style={{marginTop: '60px'}}>
                <div className="row mx-0 align-items-center justify-content-between mb-5">
                    <h2 className="color-primary">
                        Рассылки
                    </h2>
                    <div className="d-flex align-items-center">
                        <span className="color-gray d-block mr-4">Фильтры</span>
                    </div>
                </div>
                <Loading loading={this.props.isLoading} text="Загружаем список...">
                    <div className="row py-3">
                        {this.props.mailings.map((mailing, index) =>
                            <div className="col-xl-3 col-lg-4 col-sm-6 col-12" key={index}>
                                <MailingCard mailingId={mailing.id} style={{marginBottom: '40px'}}/>
                            </div>
                        )}
                    </div>
                </Loading>
                <div className="row mx-0 align-items-center justify-content-between">
                    <p className="mb-0 font-weight-bold" onClick={ () => alert('hi') }>{this.props.mailings.length} Рассылок</p>
                    <CircleButton style={{position: 'fixed', bottom: '20px', right: '50px', zIndex: '1000'}} onClick={ () => this.setState({ dialogVisible: true }) }>+</CircleButton>
                </div>
                <div className="modal-container" style={{zIndex:"1032", position: 'relative'}}>
                    <Dialog
                        title="Добавить рассылку"
                        size="small"
                        visible={ this.state.dialogVisible }
                        onCancel={ () => this.setState({ dialogVisible: false }) }
                        lockScroll={ true }
                        modalAppendToBody={ true }
                    >
                        <Dialog.Body style={{marginTop: '-30px'}}>
                            {this.state.dialogVisible ? <NewMailing onSuccess={this.handleAddNewMailingSuccess.bind(this)}/> : ''}
                        </Dialog.Body>
                    </Dialog>
                </div>
            </div>
        )
    }

    handleAddNewMailingSuccess() {
        this.setState({dialogVisible: false})
        this.props.loadMailings()
    }

}

const mapStateToProps = ({ mailings }) => ({
    mailings: mailings.list,
    isDirty: mailings.isDirty,
    isLoading: mailings.isLoading
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadMailings
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailingLists)