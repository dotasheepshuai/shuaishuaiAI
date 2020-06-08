import React, { Component } from 'react';
import { Typography, Row, Col} from 'antd';
import {getAnniversaryDetails} from '../common';
const { Title, Paragraph } = Typography;

export class Anniversary extends Component {
    render() {
        const anniversaryDetails = getAnniversaryDetails();
        return (
            <div>
                <Title level={3}>Anniversary</Title>
                {anniversaryDetails.map((anniversary, index) => {
                    const AnniversaryComponent = StringToComponent[anniversary.componentName];
                    return (
                        <Row key={index} style={{paddingTop:'14px'}}>
                            <Col span={24}>
                                {<AnniversaryComponent date={anniversary.date} years={anniversary.years} />}
                            </Col>
                        </Row>
                    );
                })}
            </div>
        );
    }
}

class ShuaishuaiBirthday extends Component {
    render() {
        const {date, years} = this.props;
        return (
            <div>
                <Paragraph>
                    {`A pretty girl named Shuaishuai was born ${years} years ago, on ${date}. Let's wish her a happy birthday!`}
                </Paragraph>
            </div>
        );
    }
}

class FatsheepBirthday extends Component {
    render() {
        const {date, years} = this.props;
        return (
            <div>
                <Paragraph>
                    {`A handsome boy named Fatsheep was born ${years} years ago, on ${date}. Let's wish him a happy birthday!`}
                </Paragraph>
            </div>
        );
    }
}

class FirstConversation extends Component {
    render() {
        const {date, years} = this.props;
        return (
            <div>
                <Paragraph>
                    {`I still remember the first day when I met Shuaishuai on Dizhua. We had a great conversation, and that was on ${date}, ${years} years ago.`}
                </Paragraph>
            </div>
        );
    }
}

class VersionOneLaunch extends Component {
    render() {
        const {date, years} = this.props;
        return (
            <div>
                <Paragraph>
                    {`Shuaishuai AI v1.0 was launched on ${date}. ${years} years have passed since then! Time flies!`}
                </Paragraph>
            </div>
        );
    }
}

const StringToComponent = {
    ShuaishuaiBirthday: ShuaishuaiBirthday,
    FatsheepBirthday: FatsheepBirthday,
    FirstConversation: FirstConversation,
    VersionOneLaunch: VersionOneLaunch
};