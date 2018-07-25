import React from 'react'
import {Button, Form, Input, Loading, Steps} from "element-react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import './Forms.css'

class NewGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeStep: 2,
            form: {
                groupName: '',
                phonebookContactIds: [],
                operatorId: 1,
                groupId: null,
                date: [],
            },
            rules: {
                groupName: [
                    { required: true, message: 'Пожалуйста, введите название группы', trigger: 'blur' }
                ],
                phonebookContactIds: [
                    { required: true, message: 'Пожалуйста, добавьте телефоны', trigger: 'blur' }
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

    onSubmit(e) {
        e.preventDefault()
        // this.emitSubmit()
        this.refs.form.validate((valid) => {
            if (valid) {
                this.setState({isLoading: true})

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
            <div className="new-group-form">
                <Loading loading={this.state.isLoading}>
                    <Form ref="form"
                          model={this.state.form}
                          rules={this.state.rules}
                          labelWidth="120"
                          labelPosition="top"
                          onSubmit={this.onSubmit.bind(this)}
                    >
                        <div className="d-flex justify-content-center mb-4">
                            <Steps space={100} active={this.state.activeStep} finishStatus="success" style={{marginRight: '-68px'}}>
                                <Steps.Step/>
                                <Steps.Step/>
                                <Steps.Step/>
                            </Steps>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Item label="Название группы" prop="groupName" className="mb-5">
                                    <Input value={this.state.form.groupName} onChange={this.onChange.bind(this, 'groupName')}/>
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

const mapStateToProps = ({ phones }) => ({

})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {},
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewGroup)