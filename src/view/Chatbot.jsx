import React, { Component } from 'react';
import { Input, Typography, Button, message, Row, Col, Spin, Empty } from 'antd';
import { DislikeTwoTone } from '@ant-design/icons';
import moment from 'moment';
import {random} from 'lodash';
import axios from 'axios';
const { TextArea, Search } = Input;
const { Paragraph } = Typography;

export class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            input: '',
            inputCopy: '',
            output: '',
            canAlsoReplyInputVisible: false,
            canAlsoReplyInput: '',
            conversation: '',
            mode: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPressEnter = this.handleInputPressEnter.bind(this);
        this.handleCanAlsoReplyInputChange = this.handleCanAlsoReplyInputChange.bind(this);
        this.handleCanAlsoReplyInputPressEnter = this.handleCanAlsoReplyInputPressEnter.bind(this);
        this.handleDislikeButtonClick = this.handleDislikeButtonClick.bind(this);
    }

    componentDidMount() {
        this.checkMode();
        setInterval(() => this.checkMode(), 10000);
    }
    checkMode() {
        const currentHourUtc = moment.utc().hour();
        if (currentHourUtc >= 12 || currentHourUtc < 2) {
            this.setState({mode: 'day'});
        } else {
            this.setState({mode: 'night'});
        }
    }

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }
    async handleInputPressEnter() {
        const {input, conversation} = this.state;
        if (! input) {
            return;
        }
        this.setState({isLoading: true, input: '', inputCopy: input, output: ''});
        await this.mockTypingIn();
        const output = await getAIResponse(input);

        this.setState({
            isLoading: false,
            output: output,
            canAlsoReplyInputVisible: false,
            canAlsoReplyInput: '',
            conversation: `${conversation}You: ${input}\nShuaishuai: ${output}\n`
        });
    }
    async mockTypingIn() {
        let output = 'Typing in';
        this.setState({output});

        const numberOfDots = random(2, 4);
        for (let i=0; i<numberOfDots; i++) {
            await sleep();
            output = output + '.';
            this.setState({output});
        }
    }

    handleCanAlsoReplyInputChange(event) {
        this.setState({canAlsoReplyInput: event.target.value})
    }
    async handleCanAlsoReplyInputPressEnter() {
        const {inputCopy, canAlsoReplyInput, conversation} = this.state;
        if (! (inputCopy && canAlsoReplyInput)) {
            return;
        }
        this.setState({isLoading: true});
        await setAIResponse(inputCopy, canAlsoReplyInput);

        this.setState({
            isLoading: false,
            input: '',
            inputCopy: '',
            output: '',
            canAlsoReplyInputVisible: false,
            canAlsoReplyInput: '',
            conversation: `${conversation}You: ${inputCopy}\nShuaishuai: ${canAlsoReplyInput}\n`
        });
        message.success(`Remembered to reply "${canAlsoReplyInput}" for question "${inputCopy}"`);
    }

    async handleDislikeButtonClick() {
        const {inputCopy, output} = this.state;
        if (! (inputCopy && output)) {
            return;
        }
        this.setState({isLoading: true});
        await forgetAIResponse(inputCopy, output);

        this.setState({
            isLoading: false,
            input: '',
            inputCopy: '',
            output: '',
            canAlsoReplyInputVisible: false,
            canAlsoReplyInput: ''
        });
        message.success(`Forgot answer "${output}" for question "${inputCopy}"`);
    }

    render() {
        const {isLoading, input, inputCopy, output, canAlsoReplyInputVisible, canAlsoReplyInput, conversation, mode} = this.state;

        if (mode === 'night') {
            return (
                <Empty
                    image={'sleep.gif'}
                    imageStyle={{height:160}}
                    description={<span style={{fontSize:'14px'}}>Shuaishuai is sleeping now. She will be available daily 8:00-22:00 EST</span>}
                />
            );
        }

        return (
            <div>
                <Spin spinning={isLoading} size={'large'}>
                    <Row>
                        <Col sm={14} md={12} lg={10}>
                            <Search
                                value={input}
                                onChange={this.handleInputChange}
                                onPressEnter={this.handleInputPressEnter}
                                onSearch={this.handleInputPressEnter}
                                placeholder={inputPlaceholder}
                                prefix={'> '}
                                enterButton
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Paragraph style={{paddingTop:'14px'}}>You: {inputCopy}</Paragraph>
                            <Paragraph>
                                Shuaishuai: {output}
                                {output && (! output.startsWith('Typing in')) && <Button
                                    type='link'
                                    icon={<DislikeTwoTone twoToneColor={'#FF0000'} style={{fontSize:'20px'}} />}
                                    style={{paddingLeft:'14px'}}
                                    onClick={this.handleDislikeButtonClick}
                                />}
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            {output && (! output.startsWith('Typing in')) && <Button type='primary' onClick={() => this.setState({canAlsoReplyInputVisible: true})}>Can also reply...</Button>}
                        </Col>
                        <Col sm={14} md={12} lg={10}>
                            {canAlsoReplyInputVisible && <Search
                                value={canAlsoReplyInput}
                                onChange={this.handleCanAlsoReplyInputChange}
                                onPressEnter={this.handleCanAlsoReplyInputPressEnter}
                                onSearch={this.handleCanAlsoReplyInputPressEnter}
                                placeholder={canAlsoReplyInputPlaceholder}
                                prefix={'> '}
                                enterButton
                            />}
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col span={24}>
                            <TextArea
                                value={conversation}
                                autoSize={{minRows: 10}}
                                placeholder={conversationPlaceholder}
                                readOnly={true}
                                rows={10}
                            />
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

const inputPlaceholder = 'Try: How are you?';
const canAlsoReplyInputPlaceholder = 'Type in what to reply';
const conversationPlaceholder = 'Conversations will be recorded here';

async function getAIResponse(input) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}`);
    return response.data;
}

async function setAIResponse(input, output) {
    return await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}&output=${output}`);
}

async function forgetAIResponse(input, output) {
    return await axios.delete(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}&output=${output}`)
}

async function sleep() {
    return await new Promise((resolve) => setTimeout(() => resolve(), 200));
}