import React, { Component } from 'react';
import { Typography, Row, Col} from 'antd';
import {getAnniversaryDetails} from '../common';
import {Components} from '../constants';
import axios from 'axios';
import moment from 'moment';
const { Title, Paragraph } = Typography;
const OneYearAgo = moment().subtract(1, 'year');

export class Anniversary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shuaishuaiFirstTimes: [],
            fatsheepFirstTimes: []
        };
    }
    async componentDidMount() {
        this.setState({
            shuaishuaiFirstTimes: await readFirstTimes('shuaishuai'),
            fatsheepFirstTimes: await readFirstTimes('fatsheep')
        });
    }

    render() {
        const {shuaishuaiFirstTimes, fatsheepFirstTimes} = this.state;
        const anniversaryDetails = getAnniversaryDetails();
        return (
            <div>
                <Title level={3}>Anniversary</Title>
                {anniversaryDetails.map((anniversary, index) => {
                    const AnniversaryComponent = StringToComponent[anniversary.componentName];
                    return (
                        <Row key={index} style={{paddingTop:'14px'}}>
                            <Col span={24}>
                                {<AnniversaryComponent
                                    date={anniversary.date}
                                    years={anniversary.years}
                                    shuaishuaiFirstTimes={shuaishuaiFirstTimes}
                                    fatsheepFirstTimes={fatsheepFirstTimes}
                                />}
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
                    A pretty girl named Shuaishuai{Components.Crown} was born {years} years ago, on {date}. Let's wish her a happy birthday!{Components.Star}
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
                    A handsome boy named Fatsheep{Components.Crown} was born {years} years ago, on {date}. Let's wish him a happy birthday!{Components.Star}
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
                    I still remember the first day when I met Shuaishuai{Components.Heart} on Dizhua. We had a great conversation, and that was on {date}, {years} years ago.
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
                    Shuaishuai AI v1.0 was launched{Components.Rocket} on {date}. {years} years have passed since then!
                </Paragraph>
            </div>
        );
    }
}

class FirstTimesDay extends Component {
    render() {
        const {years, shuaishuaiFirstTimes, fatsheepFirstTimes} = this.props;
        const ssFirstTimes = shuaishuaiFirstTimes.map((shuaishuaiFirstTime) => {
            const object = shuaishuaiFirstTime.split('___');
            return {
                content: object[0],
                date: object[1]
            };
        }).filter((shuaishuaiFirstTime) => {
            return moment(shuaishuaiFirstTime.date).isAfter(OneYearAgo)
        });
        const fsFirstTimes = fatsheepFirstTimes.map((fatsheepFirstTime) => {
            const object = fatsheepFirstTime.split('___');
            return {
                content: object[0],
                date: object[1]
            };
        }).filter((fatsheepFirstTime) => {
            return moment(fatsheepFirstTime.date).isAfter(OneYearAgo)
        });

        return (
            <div>
                <Paragraph>
                    Today is the {years+1}-th First Times Day{Components.Heart} Throughout the past year, Shuaishuai has recorded {ssFirstTimes.length} first times with Fatsheep, and Fatsheep has recorded {fsFirstTimes.length} first times with Shuaishuai~
                </Paragraph>
                <Row>
                    <Col span={12}>
                        <Title level={4}>Shuaishuai:</Title>
                        {ssFirstTimes.map((ssFirstTime, index) => {
                            return (
                                <Paragraph key={index}>
                                    {moment(ssFirstTime.date).format('YYYY-MM-DD')} - {ssFirstTime.content}
                                </Paragraph>
                            );
                        })}
                    </Col>
                    <Col span={12}>
                        <Title level={4}>Fatsheep:</Title>
                        {fsFirstTimes.map((fsFirstTime, index) => {
                            return (
                                <Paragraph key={index}>
                                    {moment(fsFirstTime.date).format('YYYY-MM-DD')} - {fsFirstTime.content}
                                </Paragraph>
                            );
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}

const StringToComponent = {
    ShuaishuaiBirthday: ShuaishuaiBirthday,
    FatsheepBirthday: FatsheepBirthday,
    FirstConversation: FirstConversation,
    VersionOneLaunch: VersionOneLaunch,
    FirstTimesDay: FirstTimesDay
};

async function readFirstTimes(person) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=getfirsttimes&input=firsttimesfirsttimes_${person}`);
    return response.data;
}