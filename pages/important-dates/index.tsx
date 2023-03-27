import React from 'react';
import { Calendar, Typography, Modal } from 'antd';
import moment from 'moment';

const { Title } = Typography;

const importantDates = [
  {
    date: '2023-01-01',
    title: 'Año Nuevo',
  },
  {
    date: '2023-02-06',
    title: 'Día de la Constitución Mexicana',
  },
  {
    date: '2023-03-20',
    title: 'Natalicio de Benito Juárez',
  },
  {
    date: '2023-05-01',
    title: 'Día Internacional del Trabajo',
  },
  {
    date: '2023-09-16',
    title: 'Día de la Independencia de México',
  },
  {
    date: '2023-11-20',
    title: 'Aniversario de la Revolución Mexicana',
  },
  {
    date: '2023-12-25',
    title: 'Navidad',
  },
];

const dateCellRender = (value:any) => {
  const dateMatch = importantDates.find(
    (importantDate) => value.format('YYYY-MM-DD') === importantDate.date
  );

  if (dateMatch) {
    return (
      <div style={{ backgroundColor: 'lightblue', padding: '4px' }}>
        <div>{value.date()}</div>
        <div>{dateMatch.title}</div>
      </div>
    );
  } else {
    return <div>{value.date()}</div>;
  }
};

const ImportantDatesCalendar = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(moment());

    const handleDateSelect = (value: any) => {
        const dateMatch = importantDates.find(
            (importantDate) => value.format('YYYY-MM-DD') === importantDate.date
        )
        if (dateMatch) {
            setSelectedDate(value);
            setIsModalVisible(true);
        }
    };

    const handleModalCancel = () => { 
        setIsModalVisible(false);
    }
  return (
    <div>
      <Title level={3}>Calendario de Fechas Importantes</Title>
          <Calendar dateCellRender={dateCellRender} onSelect={handleDateSelect} />
          <Modal
              title={`Salario doble para ${selectedDate.format('DD/MM/YYYY')}`}
              open={isModalVisible}
              onCancel={handleModalCancel}
              footer={null}
          >
              <p>Si trabajas en esta fecha, tienes derecho a recibir un salario doble.Por ejemplo: si ganas 200 pesos, deberías recibir 600.</p>
          </Modal>
    </div>
  );
};

export default ImportantDatesCalendar;
