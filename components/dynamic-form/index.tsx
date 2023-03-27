import * as React from 'react';
import listOfBenefits from '../../utils/benefits.json';
import total from './total';

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

import { DynamicFormMethods } from '@/utils/dynamic-form-methods';

//Constantes y variables 
const list = listOfBenefits.list_of_benefits;
const minimumWage = 207.44;
const { Option } = Select;

// Métodos de ayuda
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
    // Faltan los estados de los inputs
    // Falta input de horas extras
    // Falta input de vacaciones adeudadas
    const [formValues, setFormValues] = React.useState({
        companyName: '',
        startDate: '',
        finishDate: '',
        salary: 0,
        benefits: [],
        tips: false,
        tipsAmount: '',
        bonusDays: 15, 
        vacationDays: 12,
        vacationBonus: 0.25,
        earnedWages: 0,
    });
    const [benefitValues, setBenefitValues] = React.useState({});

    const sumBenefitValues = Object.values(benefitValues).reduce((acc: any, value: any) => acc + Number(value), 0);

    const baseSalary = formValues.salary / 30;

    const integratedSalary = baseSalary + ((formValues.bonusDays / 365 * baseSalary + formValues.vacationDays * formValues.vacationBonus / 365 * baseSalary) + Number(sumBenefitValues) / 30);
    
    const differenceBetweenDates = DynamicFormMethods.getDifferenceBetweenDates(formValues.startDate, formValues.finishDate)

    const daysSinceDismissal = DynamicFormMethods.getDaysSinceDismission(formValues.finishDate);

    const downWages = DynamicFormMethods.getDownWages(formValues.finishDate, integratedSalary);

    const seniorityBonus = DynamicFormMethods.getSeniorityBonus(formValues.startDate, formValues.finishDate, minimumWage, integratedSalary);

    const proportionalDays = DynamicFormMethods.getProportionalDays(formValues.startDate, formValues.finishDate);

    const proportionalBonus = DynamicFormMethods.getProportionalBonus(formValues.startDate, formValues.finishDate, formValues.bonusDays ,baseSalary);

    const proportionalDaysOfCurrentPeriod = DynamicFormMethods.getProportionalDaysOfCurrentPeriod(formValues.startDate, formValues.finishDate);

    const proportionalVacation = DynamicFormMethods.getProportionalVacation(formValues.vacationDays, formValues.startDate, formValues.finishDate, baseSalary);

    const proportionalVacationBonus = DynamicFormMethods.getProportionalVacationBonus(formValues.vacationDays, formValues.startDate, formValues.finishDate, baseSalary, formValues.vacationBonus)

    const twentyDaysByYear = DynamicFormMethods.getTwentyDaysByYear(formValues.startDate, formValues.finishDate, integratedSalary)

    const myEarnedWages = formValues.earnedWages * integratedSalary

    const calculateTotal = () => { 
        const anotherBenefits = 4915.56;
        return total(
            Number(downWages),
            Number(integratedSalary),
            Number(seniorityBonus),
            Number(proportionalBonus),
            Number(proportionalVacation),
            Number(proportionalVacationBonus),
            Number(twentyDaysByYear),
            Number(formValues.earnedWages),
            Number(anotherBenefits),
        )
    }


    const { months, days } = differenceBetweenDates;

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
            <Form.Item label="¿Cuándo empezaste a trabajar en la empresa?">
                <DatePicker
                    name="startDate"
                    id="startDate"
                    format={'DD/MM/YYYY'}
                    onChange={(date, dateString) => handleChange(null,'startDate',dateString)}
                />
            </Form.Item>
                <Form.Item label="¿Cuándo dejaste de trabajar en la empresa?">
                    <DatePicker
                        name="finishDate"
                        id="finishDate"
                        format={'DD/MM/YYYY'}
                        onChange={(date, dateString) => handleChange(null, 'finishDate', dateString)}
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
                {/*campo: ¿Te deben días trabajados? */}
                <Form.Item label="¿Cuántos días trabajados te deben?">
                    <InputNumber
                        name="earnedWages"
                        id="earnedWages"
                        value={formValues.earnedWages}
                        onChange={(value) => handleChange(null, 'earnedWages', value)}
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
            <Typography>Fecha de salida: {formValues.finishDate} </Typography>
            <Typography>Salario base: {baseSalary.toFixed(2)} </Typography>
            <Typography>Días de aguinaldo: {formValues.bonusDays}</Typography>
            <Typography>Días de vacaciones: {formValues.vacationDays}</Typography>
            <Typography>Prima vacacional: {formValues.vacationBonus}</Typography>
            <Typography>Salario Diario Integrado: {integratedSalary.toFixed(2)}</Typography>
            <Typography>Antigüedad: {`${months} meses`}</Typography>
            <Typography>Días desde el despido: {daysSinceDismissal}</Typography>
            <Typography>Días propor de ultimo año: {proportionalDays}</Typography>
            <Typography>Días proporcionales de ultimo periodo: {proportionalDaysOfCurrentPeriod}</Typography>
            <Divider />
            <Typography>Indemnización constitucional: {(integratedSalary * 90).toFixed(2)}</Typography>
            <Typography>Salarios caidos: {downWages}</Typography>
            <Typography>Prima de antigüedad: {seniorityBonus}</Typography>
            <Typography>Aguinaldo proporcional: {proportionalBonus}</Typography>
            <Typography>Vacaciones Proporcionales: {proportionalVacation}</Typography>
            <Typography>Prima Vacacional proporcional: {proportionalVacationBonus} </Typography>
            <Typography>Salarios Devengados: {myEarnedWages}</Typography>
            <Typography>20 días por año: {twentyDaysByYear}</Typography>
            <Typography>TOTAL:{calculateTotal()}</Typography>
        </>
    )
}