import React from 'react';
import { Layout, Row, Col, Typography, Button } from 'antd';
import { SeoHead } from '../seo-head';
import { Header, Content, Footer } from 'antd/es/layout/layout';

const { Title, Paragraph } = Typography;

const LandingPage = () => (
  <Layout>
    <Header>
      {/* Agrega aquí el logotipo y la barra de navegación */}
    </Header>
    <Content>
      <Row>
        <Col span={12}>
          <Title>Bienvenido a LaborAid</Title>
          <Paragraph>
            Conoce tus derechos laborales y calcula tus pagos de acuerdo con la
            Ley Federal del Trabajo en México.
          </Paragraph>
          <Button type="primary" >
            Descarga la aplicación
          </Button>
        </Col>
        <Col span={12}>
          {/* Agrega aquí una imagen o ilustración */}
        </Col>
      </Row>
      {/* Agrega más secciones para describir las características principales */}
    </Content>
    <Footer>
      {/* Agrega aquí el pie de página */}
    </Footer>
  </Layout>
);

export default LandingPage;
