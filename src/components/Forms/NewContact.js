import React from 'react'
import {Button, Form, Input, Message, Radio, Select, Switch, Loading} from "element-react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {loadCities} from "../../modules/cities"
import {loadTariffs} from "../../modules/tariffs"
import {addPhone} from "../../modules/phones"
import InputMask from 'react-input-mask'

class NewContact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            form: {
                cityId: null,
                firstName: '',
                lastName: '',
                middleName: '',
                operatorId: 1,
                phoneNumber: '',
                sex: 'm',
                statusId: 0,
                tariffId: null
            },
            rules: {
                firstName: [
                    { required: true, message: 'Пожалуйста, введите свое имя', trigger: 'blur' }
                ],
                lastName: [
                    { required: true, message: 'Пожалуйста, введите свою фамилию', trigger: 'blur' }
                ],
                middleName: [
                    { required: false }
                ],
                phoneNumber: [
                    { required: true, message: 'Пожалуйста, введите свой номер', trigger: 'blur' }
                ],
                cityId: [
                    { type: 'number', required: true, message: 'Пожалуйста, выберите верный город', trigger: 'change' }
                ],
                tariffId: [
                    { type: 'number', required: true, message: 'Пожалуйста, выберите верный тариф', trigger: 'change' }
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
        if (!this.props.cities.isDirty) {
            this.props.loadCities()
        }
        if (!this.props.tariffs.isDirty) {
            this.props.loadTariffs()
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.emitSubmit()
        this.refs.form.validate((valid) => {
            if (valid) {
                this.setState({isLoading: true})
                this.props.addPhone(this.state.form).then(() => {
                    this.emitSuccess(this.state.form)
                    this.setState({isLoading: false})
                    Message({
                        showClose: true,
                        message: `Новый контакт успешно добавлен.`,
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
            <Loading loading={this.state.isLoading}>
                <Form ref="form"
                      model={this.state.form}
                      rules={this.state.rules}
                      labelWidth="120"
                      labelPosition="top"
                      onSubmit={this.onSubmit.bind(this)}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Фамилия" prop="lastName" className="mb-5">
                                <Input value={this.state.form.lastName} onChange={this.onChange.bind(this, 'lastName')}/>
                            </Form.Item>
                            <Form.Item label="Имя" prop="firstName" className="mb-5">
                                <Input value={this.state.form.firstName} onChange={this.onChange.bind(this, 'firstName')}/>
                            </Form.Item>
                            <Form.Item label="Отчество" className="mb-5">
                                <Input value={this.state.form.middleName} onChange={this.onChange.bind(this, 'middleName')}/>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Номер" prop="phoneNumber" className="mb-5">
                                <InputMask mask="+7 (799) 999 99 99" value={this.state.form.phoneNumber} onChange={this.onChange.bind(this, 'phoneNumber')}>
                                    {(inputProps) => <Input {...inputProps} type="tel"/>}
                                </InputMask>
                            </Form.Item>
                            <Form.Item label="Тариф" prop="tariffId" className="mb-5">
                                <Select placeholder="Выберите тариф"
                                        style={{width: '100%'}}
                                        value={this.state.form.tariffId}
                                        onChange={this.onChange.bind(this, 'tariffId')}
                                        clearable={true}
                                        filterable={true}
                                >
                                    {
                                        this.props.tariffs.list.map(el => {
                                            return <Select.Option key={el.id} label={el.title} value={el.id} />
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Область и город" prop="cityId" className="mb-5">
                                <Select placeholder="Выберите город"
                                        style={{width: '100%'}}
                                        value={this.state.form.cityId}
                                        onChange={this.onChange.bind(this, 'cityId')}
                                        clearable={true}
                                        filterable={true}
                                >
                                    {
                                        this.props.cities.list.map(el => {
                                            return <Select.Option key={el.id} label={el.name} value={el.id} />
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-5">
                            <Form.Item prop="sex" label="Пол" className="mb-0">
                                <Radio.Group value={this.state.form.sex}  onChange={this.onChange.bind(this, 'sex')}>
                                    <Radio value='m'>Мужчина</Radio>
                                    <Radio value='f'>Женщина</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className="col-5">
                            <Form.Item prop="statusId" label="Статус подписки" className="mb-0">
                                <Switch
                                    value={this.state.form.statusId}
                                    onColor="#643f8e"
                                    offColor="#b9b3e2"
                                    onValue={0}
                                    offValue={1}
                                    onText="Вкл"
                                    offText="Выкл"
                                    width={70}
                                    onChange={this.onChange.bind(this, 'statusId')}
                                />
                            </Form.Item>
                        </div>
                        <div className="col-2">
                            <div className="d-flex justify-content-end align-items-end h-100">
                                <Form.Item className="mb-0">
                                    <Button type="primary" nativeType="submit">Добавить</Button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
            </Loading>
        )
    }

}

const mapStateToProps = ({ cities, tariffs }) => ({
    cities: cities,
    tariffs: tariffs
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadCities,
            loadTariffs,
            addPhone,
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewContact)