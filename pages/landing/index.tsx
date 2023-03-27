import React from 'react';
import Head from 'next/head';
import { Button, Typography, Layout, Row, Col, Card, Avatar,Input } from 'antd';
import { CalculatorOutlined, NotificationOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;


export default function Landing() { 
    const [email, setEmail] = React.useState('');
    const [emailPreviouslySubmitted, setEmailPreviouslySubmitted] = React.useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(event.target.value);
    }

    const handleJoinWaitlist = () => { 
        const savedEmail = localStorage.setItem('email', email);
        if (savedEmail !== null) { 
            setEmailPreviouslySubmitted(true);
        }
        
        setEmail('');
    }
    return (
    <Layout>
    <Header>
      {/* Agrega aquí el logotipo y la barra de navegación */}
    </Header>
    <Content>
      <Row align="middle" style={{ minHeight: '80vh', padding: '2rem' }}>
        <Col span={12}>
          <Title>LaborAid: Conoce tus derechos laborales y asegura un futuro próspero</Title>
          <Paragraph>Tus derechos laborales, nuestra prioridad.</Paragraph>
        <Row gutter={16} align="middle">
            {
            emailPreviouslySubmitted ? (
                                    <Col>
                                        <Title level={4}>¡Gracias por unirte a la lista de espera!</Title>
                                    </Col>
                    ): (
                    <>
                    <Col>
                        <Input
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Ingresa tu correo electrónico"
                            style={{ width: '300px', marginRight: '1rem' }}
                            />
                        </Col>
                        <Col>
                            <Button type="primary" size="large" onClick={handleJoinWaitlist}>
                            ¡Únete a la lista de espera!
                            </Button>
                        </Col>
                    </>
            ) 
            }
        </Row>
        </Col>
        <Col span={12}>
          {/* Agrega aquí una imagen o ilustración */}
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ padding: '2rem' }}>
        {/* Secciones principales */}
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<CalculatorOutlined style={{ fontSize: '4rem', textAlign: 'center', paddingTop: '1rem' }} />}
          >
            <Meta
              title="Calculadora de pagos y beneficios"
              description="Calcula tus salarios, horas extras y aguinaldo en un instante."
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<NotificationOutlined style={{ fontSize: '4rem', textAlign: 'center', paddingTop: '1rem' }} />}
          >
            <Meta
              title="Notificaciones y actualizaciones"
              description="Mantente informado sobre leyes laborales y días festivos."
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<TeamOutlined style={{ fontSize: '4rem', textAlign: 'center', paddingTop: '1rem' }} />}
          >
            <Meta
              title="Directorio de abogados laborales"
              description="Encuentra asesoría legal especializada en derecho laboral."
            />
          </Card>
        </Col>
      </Row>

      {/* Testimonios */}
      <Row style={{ backgroundColor: '#f0f2f5', padding: '2rem', gap:'1rem' }}>
        <Col span={24}>
          <Title level={2}>Testimonios de usuarios satisfechos</Title>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Meta
              avatar={<Avatar src="URL de la imagen del usuario" />}
              title="Nombre del usuario"
              description="LaborAid me ha ayudado a entender mis derechos laborales y me ha proporcionado herramientas útiles para calcular mis pagos correctamente. ¡Altamente recomendado!"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Meta
              avatar={<Avatar src="URL de la imagen del usuario" />}
              title="Nombre del usuario"
              description="Con LaborAid, pude encontrar un abogado laboral que me asesoró durante una disputa con mi empleador. La plataforma es fácil de usar y los recursos son de gran ayuda."
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Meta
              avatar={<Avatar src="URL de la imagen del usuario" />}
              title="Nombre del usuario"
              description="La comunidad y el foro de LaborAid me han permitido conectarme con otros trabajadores y aprender de sus experiencias. ¡Es una herramienta indispensable para todos los trabajadores!"
            />
          </Card>
        </Col>
      </Row>
    </Content>
    <Footer>
      {/* Agrega aquí el contenido del pie de página, como información de contacto y enlaces a políticas de privacidad y términos y condiciones */}
      LaborAid © 2023. Todos los derechos reservados. | Política de privacidad | Términos y condiciones
    </Footer>
  </Layout>
    )
}