import React, { Component } from 'react';
import { Typography, Row, Col, message, Spin, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {Components} from '../constants';
const { Search } = Input;
const { Title, Paragraph } = Typography;

export class FirstTimes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            shuaishuaiFirstTimesInput: '',
            fatsheepFirstTimesInput: '',
            shuaishuaiFirstTimes: [],
            fatsheepFirstTimes: []
        };

        this.handleShuaishuaiFirstTimesInputChange = this.handleShuaishuaiFirstTimesInputChange.bind(this);
        this.handleShuaishuaiFirstTimesInputPressEnter = this.handleShuaishuaiFirstTimesInputPressEnter.bind(this);
        this.handleFatsheepFirstTimesInputChange = this.handleFatsheepFirstTimesInputChange.bind(this);
        this.handleFatsheepFirstTimesInputPressEnter = this.handleFatsheepFirstTimesInputPressEnter.bind(this);
    }

    async componentDidMount() {
        await this.refreshFirstTimes();
    }
    async refreshFirstTimes() {
        this.setState({
            shuaishuaiFirstTimes: await readFirstTimes('shuaishuai'),
            fatsheepFirstTimes: await readFirstTimes('fatsheep')
        });
    }

    handleShuaishuaiFirstTimesInputChange(event) {
        this.setState({shuaishuaiFirstTimesInput: event.target.value});
    }
    async handleShuaishuaiFirstTimesInputPressEnter() {
        const {shuaishuaiFirstTimesInput} = this.state;
        const content = shuaishuaiFirstTimesInput.trim();

        if (! content) {
            return;
        }
        this.setState({isLoading: true});
        await sendFirstTimes('shuaishuai', `${moment().format('YYYY-MM-DD')}___${content}`);
        await this.refreshFirstTimes();

        this.setState({
            isLoading: false,
            shuaishuaiFirstTimesInput: ''
        });
        message.success(`Shuaishuai's first time has been recorded!`);
    }

    handleFatsheepFirstTimesInputChange(event) {
        this.setState({fatsheepFirstTimesInput: event.target.value});
    }
    async handleFatsheepFirstTimesInputPressEnter() {
        const {fatsheepFirstTimesInput} = this.state;
        const content = fatsheepFirstTimesInput.trim();

        if (! content) {
            return;
        }
        this.setState({isLoading: true});
        await sendFirstTimes('fatsheep', `${moment().format('YYYY-MM-DD')}___${content}`);
        await this.refreshFirstTimes();

        this.setState({
            isLoading: false,
            fatsheepFirstTimesInput: ''
        });
        message.success(`Fatsheep's first time has been recorded!`);
    }

    getCrown(myFirstTimes, otherFirstTimes) {
        if (myFirstTimes.length >= otherFirstTimes.length) {
            return Components.Crown;
        } else {
            return undefined;
        }
    }

    render() {
        const {isLoading, shuaishuaiFirstTimesInput, fatsheepFirstTimesInput, shuaishuaiFirstTimes, fatsheepFirstTimes} = this.state;

        return (
            <div>
                <Spin spinning={isLoading} size={'large'}>
                    <Title level={3}>First Times</Title>
                    <Paragraph level={3}>Write down your first times with each other!</Paragraph>
                    <Row>
                        <Col span={12}>
                            <Search
                                value={shuaishuaiFirstTimesInput}
                                onChange={this.handleShuaishuaiFirstTimesInputChange}
                                onPressEnter={this.handleShuaishuaiFirstTimesInputPressEnter}
                                onSearch={this.handleShuaishuaiFirstTimesInputPressEnter}
                                placeholder={FirstTimesInputPlaceholder}
                                addonBefore={'Shuaishuai: '}
                                enterButton={'Record'}
                            />
                        </Col>
                    </Row>
                    <Row style={{paddingTop:'14px'}}>
                        <Col span={12}>
                            <Search
                                value={fatsheepFirstTimesInput}
                                onChange={this.handleFatsheepFirstTimesInputChange}
                                onPressEnter={this.handleFatsheepFirstTimesInputPressEnter}
                                onSearch={this.handleFatsheepFirstTimesInputPressEnter}
                                placeholder={FirstTimesInputPlaceholder}
                                addonBefore={'Fatsheep: '}
                                enterButton={'Record'}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Paragraph level={3}>Shuaishuai{this.getCrown(shuaishuaiFirstTimes, fatsheepFirstTimes)} has recorded {shuaishuaiFirstTimes.length} first times so far...</Paragraph>
                    <Paragraph level={3}>Fatsheep{this.getCrown(fatsheepFirstTimes, shuaishuaiFirstTimes)} has recorded {fatsheepFirstTimes.length} first times so far...</Paragraph>
                    <Paragraph level={3}>More details will be unveiled on First Times Day{Components.Star}</Paragraph>
                </Spin>
            </div>
        );
    }
}

const FirstTimesInputPlaceholder = 'E.g. I had my first phone...';

async function sendFirstTimes(person, content) {
    return await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=setairesponse&input=firsttimesfirsttimes_${person}&output=${content}`);
}

async function readFirstTimes(person) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=getfirsttimes&input=firsttimesfirsttimes_${person}`);
    return response.data;
}