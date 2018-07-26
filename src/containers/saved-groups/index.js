import React from 'react'
import {Button, Dialog, Loading, Table} from "element-react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import CircleButton from "../../components/Buttons/circle-button"
import {setBodyClass, setBodyStyle} from "../../modules/body"
import {loadGroups} from "../../modules/contactGroups"
import * as moment from 'moment'
import 'moment/locale/ru'
import NewGroup from "../../components/Forms/NewGroup"
import './saved-groups.css'

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
                    minWidth: '150px',
                    render: (data) =>
                        <span className="primary-on-hover" style={{fontSize: '1.8rem'}}>{data.groupName}</span>
                },
                {
                    label: "Дата создания",
                    prop: "date",
                    minWidth: '150px',
                    render: (data) =>
                        moment(data.date).format('DD/MM/YYYY')
                },
                {
                    label: "ID",
                    prop: "id",
                    width: 150,
                },
                {
                    label: "Число контактов",
                    prop: "phones",
                    width: 150,
                    render: (data) => data.phones.length
                },
                {
                    label: "Действия",
                    width: 150,
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
                <Loading loading={this.props.isLoading} text="Загружаем список...">
                    <Table
                        className="my-5 table-transparent saved-groups-table"
                        style={{width: '100%', fontSize: '15px'}}
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
                        title="Создать группу"
                        size="tiny"
                        visible={ this.state.dialogVisible }
                        onCancel={ () => this.setState({ dialogVisible: false }) }
                        lockScroll={ true }
                        modalAppendToBody={ true }
                    >
                        <Dialog.Body>
                            {this.state.dialogVisible ? <NewGroup onSuccess={ this.handleAddNewContactSuccess.bind(this) }/> : ''}
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