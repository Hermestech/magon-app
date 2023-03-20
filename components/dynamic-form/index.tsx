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
    Typography,
    Divider
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

const BenefitValueInput = ({
    benefit,
    benefitValues,
    setBenefitValues,
}: { benefit: any; benefitValues: any; setBenefitValues: any; }) => { 

    const handleChange = (value: any) => { 
        setBenefitValues((prevValues: any) => ({
            ...prevValues,
            [benefit.value]: value,
        }))
    }
    
    return (
        <Form.Item label={`Valor de ${benefit.name}:`}>   
            <InputNumber
                name={benefit.value}
                id={benefit.value}
                value={benefitValues[benefit.value] || ""}
                onChange={handleChange}
            />
        </Form.Item>
    )
}

export const DynamicForm = () => { 
    const d = new Date();
    let today = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    const list = listOfBenefits.list_of_benefits;
    const foodVouchers = 810;
    const savingFunds = 405.12;
    const puntualBonus = 540.18;
    const [formValues, setFormValues] = React.useState({
        companyName: '',
        startDate: '',
        salary: 0,
        benefits: [],
        tips: false,
        tipsAmount: '',
        bonusDays: 15, 
        vacationDays: 12,
        vacationBonus: 0.25,
    });
    const [benefitValues, setBenefitValues] = React.useState({});
    const sumBenefitValues = Object.values(benefitValues).reduce((acc: any, value: any) => acc + Number(value), 0);
    const baseSalary = formValues.salary / 30;
    const integratedSalary = baseSalary + ((formValues.bonusDays/365*baseSalary + formValues.vacationDays*formValues.vacationBonus/365 * baseSalary) + Number(sumBenefitValues)/30);

    const handleChange = (event:any,name:any,value:any) => { 
        if (!event) {
            setFormValues((prevValues) => {
                return {
                    ...prevValues,
                    [name]: value,
                }
            })

            if (name === 'benefits') {
                const benefits = value.map((id: string) => {
                    return list.find((benefit) => benefit.value === id);
                });
                const benefitValues = benefits.reduce((acc: any, benefit: any) => {
                    return {
                        ...acc,
                        [benefit.value]: 0,
                    }
                }, {});
                setBenefitValues(benefitValues);
            }
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
        <>
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
                {
                    formValues.benefits.map((id: string) => { 
                        const benefit = list.find((benefit) => benefit.value === id);
                        return (
                            <BenefitValueInput
                                key={benefit?.id}
                                benefit={benefit}
                                benefitValues={benefitValues}
                                setBenefitValues={setBenefitValues}
                            />
                        )
                    }
                )
                }
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
            <Divider />
            <Typography>Fecha de ingreso:{formValues.startDate}</Typography>
            <Typography>Fecha de salida: {today} </Typography>
            <Typography>Salario base: {baseSalary.toFixed(2)} </Typography>
            <Typography>Días de aguinaldo: {formValues.bonusDays}</Typography>
            <Typography>Días de vacaciones: {formValues.vacationDays}</Typography>
            <Typography>Prima vacacional: {formValues.vacationBonus}</Typography>
            <Typography>Salario Diario Integrado: {integratedSalary.toFixed(2)}</Typography>
            <Divider />
            <Typography>Indemnización constitucional: {(integratedSalary * 90).toFixed(2)}</Typography>
        </>
    )
}