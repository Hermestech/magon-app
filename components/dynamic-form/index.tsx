import * as React from 'react';
import listOfBenefits from '../../utils/benefits.json';

import {
    Form, 
    Input,
    Button,
    Checkbox,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';

const { Option } = Select;

const mapBenefitsIntoOptions = (benefits: IBenefit[]) => { 
    return benefits.map((benefit) => {
        return (
            <Option key={benefit.id} value={benefit.value}>
                {benefit.name}
            </Option>
        );
    });
}


export const DynamicForm = () => { 
    const list = listOfBenefits.list_of_benefits;
    const [formValues, setFormValues] = React.useState({
        companyName: '',
        startDate: '',
        salary: '',
        benefits: [],
        tips: false,
        tipsAmount: '',
        bonusDays: 15, 
        vacationDays: 12,
        vacationBonus: 25,
    });

    const handleChange = (event:any,name:any,value:any) => { 
        if (!event) {
            setFormValues((prevValues) => {
                return {
                    ...prevValues,
                    [name]: value,
                }
            })
        } else {
            const { name, value } = event.target;
            setFormValues((prevValues) => {
                return {
                    ...prevValues,
                    [name]: value,
                }
            })
        }
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(formValues);
    };

    return (
        <Form>
            <Form.Item
                label="Nombre de la empresa para la que trabajas:"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input
                    name="companyName"
                    id="companyName"
                    value={formValues.companyName}
                    onChange={(event) => handleChange(event,null,null)}
                />
            </Form.Item>
            <Form.Item label="Fecha de inicio en la empresa:">
                <DatePicker
                    name="startDate"
                    id="startDate"
                    format={'DD/MM/YYYY'}
                    onChange={(date, dateString) => handleChange(null,'startDate',dateString)}
                />
            </Form.Item>
            <Form.Item label="Salario mensual antes de impuestos:">
                <InputNumber
                    name="salary"
                    id="salary"
                    value={formValues.salary}
                    onChange={(value) => handleChange(null,'salary',value)}
                />
            </Form.Item>
            <Form.Item label="Prestaciones adicionales(selecciona todas las que apliquen)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={(value) => handleChange(null,'benefits',value)}
                >
                    {mapBenefitsIntoOptions(list)}
                </Select>
            </Form.Item>
            {/*Campo: ¿Recibes propinas? */}
            <Form.Item label="¿Recibes propinas?">
                <Checkbox

                    name="tips"
                    id="tips"
                    checked={formValues.tips}
                    onChange={(event) => handleChange(null,'tips',event.target.checked)}  
                >
                    Sí
                </Checkbox>
            </Form.Item>

            {/*Campo: Monto de propinas */}
            {
                formValues.tips && (
                    <Form.Item label="Monto de propinas">
                        <InputNumber
                            name="tipsAmount"
                            id="tipsAmount"
                            value={formValues.tipsAmount}
                            onChange={(value) => handleChange(null,'tipsAmount',value)}
                        />
                    </Form.Item>
                )
            }
            {/*campo: Días de aguinlado */}
            <Form.Item label="Días de aguinaldo (mínimo 15)">
                <InputNumber
                    name="bonusDays"
                    id="bonusDays"
                    value={formValues.bonusDays}
                    onChange={(value) => handleChange(null, 'bonusDays', value)}
                />
            </Form.Item>
            {/*campo: Días de vacaciones */}
            <Form.Item label="Días de vacaciones (mínimo 12)">
                <InputNumber
                    name="vacationDays"
                    id="vacationDays"
                    value={formValues.vacationDays}
                    onChange={(value) => handleChange(null, 'vacationDays', value)}
                />
            </Form.Item>
            {/*campo: Prima vacacional */}
            <Form.Item label="Prima vacacional (mínimo 25)">
                <InputNumber
                    name="vacationBonus"
                    id="vacationBonus"
                    value={formValues.vacationBonus}
                    onChange={(value) => handleChange(null, 'vacationBonus', value)}
                />
            </Form.Item>
            <Form.Item>
                
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    Calcular
                </Button>
            </Form.Item>
        </Form>
    )
}