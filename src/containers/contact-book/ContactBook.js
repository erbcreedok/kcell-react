import React from 'react'
import {Button, Dialog, Loading, Table} from "element-react";
import {connect} from "react-redux";
import {loadPhones} from "../../modules/phones";
import {bindActionCreators} from "redux";
import CircleButton from "../../components/Buttons/circle-button";
import NewContact from "../../components/Forms/NewContact";

class ContactBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            genders: {f: 'Женщина', m: 'Мужчина'},
            tariffs: ['Базовый +', 'Мобильный круг', 'Престиж +'],
            columns: [
                {
                    type: 'selection',
                },
                {
                    label: "Статус Подписки",
                    prop: "status",
                    minWidth: '100px',
                    render: (data) => {
                        return data.status==='ACTIVE' ?
                                <span className="color-success">Подписан</span>
                            : data.status==='INACTIVE' ?
                                <span className="color-danger">Отписан</span>
                            : ''

                    }
                },
                {
                    label: "ФИО",
                    prop: "fullName",
                    minWidth: '180px'
                },
                {
                    label: "Пол",
                    prop: "sex",
                    width: 120,
                    render: (data) => {
                        return this.state.genders[data.sex]
                    }
                },
                {
                    label: "Номер",
                    prop: "phoneNumber",
                    width: 170
                },
                {
                    label: "Тариф",
                    prop: "tariff",
                    minWidth: 100,
                    render: (data) => {
                        return data.tariff.title
                    }
                },
                {
                    label: "Действия",
                    width: 100,
                    render: ()=>{
                        return <span>
                            <Button type="text" size="small" className="mx-3"><i className="el-icon-edit color-gray"/></Button>
                            <Button type="text" size="small" className="mx-3"><i className="el-icon-delete color-gray"/></Button>
                        </span>
                    }
                }
            ],
            dialogVisible: false
        }
    }

    componentWillMount() {
        if (!this.props.isDirty) {
            this.props.loadPhones()
        }
    }

    render () {
        return (
            <div className="contact-book" style={{marginTop: '92px'}}>
                <div className="row mx-0 align-items-center justify-content-between">
                    <h2 className="color-primary">
                        Адресная книга
                    </h2>
                    <div className="d-flex align-items-center">
                        <span className="color-gray d-block mr-4">Фильтры</span>
                    </div>
                </div>
                <Loading loading={this.props.isLoading} text="Загружаем список...">
                    <Table
                        className="my-5"
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.props.phones}
                        border={false}
                        maxHeight={492}
                        emptyText={this.props.isDirty ? 'Данных нет' : 'Загружаем'}
                    />
                </Loading>
                <div className="row mx-0 align-items-center justify-content-between">
                    <p className="mb-0 font-weight-bold" onClick={ () => alert('hi') }>{this.props.phones.length} Контактов</p>
                    <CircleButton onClick={ () => this.setState({ dialogVisible: true }) }>+</CircleButton>
                </div>
                <div className="modal-container" style={{zIndex:"1032", position: 'relative'}}>
                    <Dialog
                        title="Добавить контакт"
                        size="small"
                        visible={ this.state.dialogVisible }
                        onCancel={ () => this.setState({ dialogVisible: false }) }
                        lockScroll={ true }
                        modalAppendToBody={ true }
                    >
                        <Dialog.Body>
                            {this.state.dialogVisible ? <NewContact onSuccess={ () => { this.setState({dialogVisible: false}); this.props.loadPhones() }}/> : ''}
                        </Dialog.Body>
                    </Dialog>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ phones }) => ({
    phones: phones.list,
    isDirty: phones.isDirty,
    isLoading: phones.isLoading
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadPhones
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactBook)