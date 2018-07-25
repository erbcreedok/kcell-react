import React from 'react'
import {Button, Dialog, Loading, Table} from "element-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CircleButton from "../../components/Buttons/circle-button";
import NewContact from "../../components/Forms/NewContact";
import {setBodyClass, setBodyStyle} from "../../modules/body";
import {loadGroups} from "../../modules/contactGroups";
import * as moment from 'moment'
import 'moment/locale/ru'

class SavedGroups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: '',
                    prop: 'action',
                    width: '140px',
                    render() {
                        const style = {width: '95px', height: '38px', textAlign: 'center', fontSize: '14px'}
                        return <Button style={style} className="btn-default mx-auto">
                            <i className="el-icon-plus"/>
                        </Button>
                    }
                },
                {
                    label: "Название",
                    prop: "groupName",
                    minWidth: '200px',
                },
                {
                    label: "Дата создания",
                    prop: "date",
                    minWidth: '100px',
                    render: (data) => {
                        return data.date.format('DD/MM/YYYY')
                    }
                },
                {
                    label: "ID",
                    prop: "id",
                    width: 120,
                },
                {
                    label: "Число контактов",
                    prop: "phones",
                    width: 170,
                    render: (data) => {
                        return data.phones.length
                    }
                },
                {
                    label: "Действия",
                    width: 100,
                    render: ()=>{
                        return <span>
                            <Button type="text" size="small" className="mx-3 d-inline-block"><i className="el-icon-edit color-gray"/></Button>
                            <Button type="text" size="small" className="mx-3 d-inline-block"><i className="el-icon-delete color-gray"/></Button>
                        </span>
                    }
                }
            ],
            dialogVisible: false
        }
    }

    componentWillMount() {
        this.props.setBodyClass('bg-silver-blue')
        if (!this.props.isDirty) {
            this.props.loadGroups()
        }
    }

    componentWillUnmount() {
        this.props.setBodyClass('')
    }

    render () {
        console.log(this.props.groups)
        return (
            <div className="contact-book" style={{marginTop: '60px'}}>
                <div className="row mx-0 align-items-center justify-content-between">
                    <h2 className="color-primary">
                        Сохраненные группы
                    </h2>
                    <div className="d-flex align-items-center">
                        <span className="color-gray d-block mr-4">Фильтры</span>
                    </div>
                </div>
                <Loading loading={!this.props.isLoading} text="Загружаем список...">
                    <Table
                        className="my-5 table-transparent"
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.props.groups}
                        border={false}
                        maxHeight={492}
                        emptyText={this.props.isDirty ? 'Данных нет' : 'Загружаем'}
                    />
                </Loading>
                <div className="row mx-0 align-items-center justify-content-between">
                    <p className="mb-0 font-weight-bold" onClick={ () => alert('hi') }>{this.props.groups.length} Контактов</p>
                    <CircleButton style={{position: 'fixed', bottom: '20px', right: '50px', zIndex: '1000'}} onClick={ () => this.setState({ dialogVisible: true }) }>+</CircleButton>
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
                            {this.state.dialogVisible ? <NewContact onSuccess={ this.handleAddNewContactSuccess.bind(this) }/> : ''}
                        </Dialog.Body>
                    </Dialog>
                </div>
            </div>
        )
    }

    handleAddNewContactSuccess() {
        this.setState({dialogVisible: false})
        this.props.loadPhones()
    }

}

const mapStateToProps = ({ contactGroups }) => ({
    groups: contactGroups.list,
    isLoading: contactGroups.isLoading,
    isDirty: contactGroups.isDirty
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setBodyClass,
            setBodyStyle,
            loadGroups,
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedGroups)