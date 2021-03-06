import React, { Component } from 'react';
import { Typography, Row, Col } from 'antd';
const { Title, Paragraph } = Typography;

export class Sponsor extends Component {
    render() {
        return (
            <div>
                <Title level={3}>Sponsor</Title>
                <Paragraph>Thank you for supporting us!</Paragraph>
                <Row>
                    <Col span={12}>
                        <img src={'WechatPay.JPG'} width='200' alt={'WechatPay QR Code'} />
                    </Col>
                </Row>
            </div>
        );
    }
}