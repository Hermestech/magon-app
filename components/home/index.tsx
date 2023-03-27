import React from 'react';
import { Layout, Menu, Button, Typography, Row, Col, Space, Card } from 'antd';
import {
  CalculatorOutlined,
  CalendarOutlined,
  ReadOutlined,
  TeamOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const HomePage = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Magon App</Menu.Item>
          <Menu.Item key="2">Calculadora de finiquitos y liquidaciones.</Menu.Item>
          <Menu.Item key="3">Fechas importantes</Menu.Item>
          <Menu.Item key="4">Derechos laborales</Menu.Item>
          <Menu.Item key="5">Abogados</Menu.Item>
          <Menu.Item key="6">Foro de discusión</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Row justify="center">
          <Col>
            <Title level={2}>Bienvenido a MagonApp</Title>
          </Col>
        </Row>
        <Row gutter={[16, 24]} justify="center">
          <Col>
            <Card
              title="Calculadora de finiquitos y liquidaciones"
              extra={<Button href="/calculator">Ir</Button>}
              style={{ width: 300 }}
            >
              <CalculatorOutlined style={{ fontSize: '48px' }} />
              <p>Calcula tu salario justo y pagos adicionales.</p>
            </Card>
          </Col>
          <Col>
            <Card
              title="Fechas importantes"
              extra={<Button href="/important-dates">Ir</Button>}
              style={{ width: 300 }}
            >
              <CalendarOutlined style={{ fontSize: '48px' }} />
              <p>Recibe notificaciones de fechas clave en tu empleo.</p>
            </Card>
          </Col>
          <Col>
            <Card
              title="Derechos laborales"
              extra={<Button href="/labor-rights">Ir</Button>}
              style={{ width: 300 }}
            >
              <ReadOutlined style={{ fontSize: '48px' }} />
              <p>Aprende sobre tus derechos laborales.</p>
            </Card>
          </Col>
          <Col>
            <Card
              title="Abogados"
              extra={<Button href="/lawyers">Ir</Button>}
              style={{ width: 300 }}
            >
              <SolutionOutlined style={{ fontSize: '48px' }} />
              <p>Encuentra abogados especializados en derecho laboral.</p>
            </Card>
          </Col>
          <Col>
            <Card
              title="Foro de discusión"
              extra={<Button href="/forum">Ir</Button>}
              style={{ width: 300 }}
            >
              <TeamOutlined style={{ fontSize: '48px' }} />
              <p>Comparte experiencias y recibe consejos de la comunidad.</p>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>JustPay ©2023</Footer>
    </Layout>
  );
};