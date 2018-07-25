import React from 'react'
import {Button, Form, Input, Message, Loading, Select, DateRangePicker} from "element-react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import './Forms.css'
import {loadGroups} from "../../modules/contactGroups";
import {addMailing} from "../../modules/mailings";

class NewMailing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            form: {
                alphaNumber: '',
                bulkSmsName: '',
                text: '',
                operatorId: 1,
                groupId: null,
                date: [],
            },
            rules: {
                alphaNumber: [
                    { required: true, message: 'Пожалуйста, введите альфаномер', trigger: 'blur' }
                ],
                bulkSmsName: [
                    { required: true, message: 'Пожалуйста, введите название рассылки', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Пожалуйста, введите текст для рассылки', trigger: 'blur' }
                ],
                groupId: [
                    { type: 'number', required: true, message: 'Пожалуйста, выберите группу для которой вы шлете рассылку', trigger: 'change' }
                ],
                date: [
                    { type: 'array', required: true, message: 'Пожалуйста, укажите время рассылки', trigger: 'change' },
                    { validator: (rule, value, callback) => {
                        if (!value) {
                            callback(new Error('Пожалуйста, укажите время рассылки'))
                        } else if (value[0] === null) {
                            callback(new Error('Пожалуйста, введите время начала рассылки'))
                        } else if (value[1] === null){
                            callback(new Error('Пожалуйста, введите время окончания рассылки'))
                        } else {
                            callback()
                        }
                    } }
                ],
            }
        }
    }

    emitSuccess(data) {
        if (this.props.onSuccess) {
            this.props.onSuccess(data)
        }
    }

    emitSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit()
        }
    }

    componentDidMount() {
        if (!this.props.groups.isDirty) {
            this.props.loadGroups()
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.emitSubmit()
        this.refs.form.validate((valid) => {
            if (valid) {
                this.setState({isLoading: true})
                this.props.addMailing(this.state.form).then(() => {
                    this.emitSuccess(this.state.form)
                    this.setState({isLoading: false})
                    Message({
                        showClose: true,
                        message: `Новая рассылка успешно добавлена.`,
                        type: 'success',
                        duration: 3000
                    })
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })
    }

    onChange(key, value) {
        this.setState({
            form: {
                ...this.state.form,
                [key]: value,
            }
        })
        this.forceUpdate()
    }

    render() {
        return (
            <div className="new-mailing-form">
                <div className="row form-notification">
                    <div className="col-md-6">
                        <p>Перед добавлением рассылки, не забудьте создать список абонентов.</p>
                    </div>
                </div>
                <Loading loading={this.state.isLoading}>
                    <Form ref="form"
                          model={this.state.form}
                          rules={this.state.rules}
                          labelWidth="120"
                          labelPosition="top"
                          onSubmit={this.onSubmit.bind(this)}
                    >
                        <div className="row py-5">
                            <div className="col-md-6">
                                <Form.Item label="Альфаномер" prop="alphaNumber" className="mb-5">
                                    <Input value={this.state.form.alphaNumber} onChange={this.onChange.bind(this, 'alphaNumber')}/>
                                </Form.Item>
                                <Form.Item label="Название рассылки" prop="bulkSmsName" className="mb-5">
                                    <Input value={this.state.form.bulkSmsName} onChange={this.onChange.bind(this, 'bulkSmsName')}/>
                                </Form.Item>
                                <Form.Item label="Группа абонентов" prop="groupId" className="mb-5">
                                    <Select placeholder="Выберите группу"
                                            style={{width: '100%'}}
                                            value={this.state.form.groupId}
                                            onChange={this.onChange.bind(this, 'groupId')}
                                            clearable={true}
                                            filterable={true}
                                    >
                                        {
                                            this.props.groups.list.map(el => {
                                                return <Select.Option key={el.id} label={el.groupName} value={el.id}>
                                                    {el.groupName}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Сообщение" prop="text" className="mb-0">
                                    <Input type="textarea" autosize={{ minRows: 4, maxRows: 8}} value={this.state.form.text} onChange={this.onChange.bind(this, 'text')}/>
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item label="Время рассылки" prop="date" className="mb-5">
                                    <DateRangePicker
                                        firstDayOfWeek={1}
                                        isShowTime={true}
                                        value={this.state.form.date}
                                        placeholder="Укажите промежуток"
                                        onChange={this.onChange.bind(this, 'date')}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row pt-2 mx-0">
                            <Form.Item className="mb-0">
                                <Button type="primary" nativeType="submit">Добавить</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Loading>
            </div>
        )
    }

}

const mapStateToProps = ({ contactGroups }) => ({
    groups: contactGroups
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadGroups,
            addMailing
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewMailing)