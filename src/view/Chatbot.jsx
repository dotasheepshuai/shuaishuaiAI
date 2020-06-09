import React, { Component } from 'react';
import { Input, Typography, Button, message, Row, Col, Spin, Empty } from 'antd';
import { DislikeTwoTone } from '@ant-design/icons';
import moment from 'moment';
import {random} from 'lodash';
import axios from 'axios';
import settle from 'promise-settle';
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
            mode: '',
            phoneInput: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPressEnter = this.handleInputPressEnter.bind(this);
        this.handleCanAlsoReplyInputChange = this.handleCanAlsoReplyInputChange.bind(this);
        this.handleCanAlsoReplyInputPressEnter = this.handleCanAlsoReplyInputPressEnter.bind(this);
        this.handlePhoneInputChange = this.handlePhoneInputChange.bind(this);
        this.handlePhoneInputPressEnter = this.handlePhoneInputPressEnter.bind(this);
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
        const _input = input.trim();
        if (! _input) {
            return;
        }
        this.setState({isLoading: true, input: '', inputCopy: _input, output: ''});

        const output = (await settle([getAIResponse(_input), this.mockTypingIn()]))[0].value();

        this.setState({
            isLoading: false,
            output: output,
            canAlsoReplyInputVisible: false,
            canAlsoReplyInput: '',
            conversation: `${conversation}You: ${_input}\nShuaishuai: ${output}\n`
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
        const _canAlsoReplyInput = canAlsoReplyInput.trim();
        if (! (inputCopy && _canAlsoReplyInput)) {
            return;
        }
        this.setState({isLoading: true});
        await setAIResponse(inputCopy, _canAlsoReplyInput);

        this.setState({
            isLoading: false,
            input: '',
            inputCopy: '',
            output: '',
            canAlsoReplyInputVisible: false,
            canAlsoReplyInput: '',
            conversation: `${conversation}You: ${inputCopy}\nShuaishuai: ${_canAlsoReplyInput}\n`
        });
        message.success(`Remembered to reply "${_canAlsoReplyInput}" for question "${inputCopy}"`);
    }

    handlePhoneInputChange(event) {
        this.setState({phoneInput: event.target.value});
    }
    async handlePhoneInputPressEnter() {
        const {conversation, phoneInput} = this.state;
        const _phoneInput = phoneInput.trim();
        if (conversation.length > 240) {
            return message.info('Cannot send conversation longer than 240 characters');
        }
        if (! /^\d{10}$/.test(_phoneInput)) {
            return message.info('Phone number must be 10 digits');
        }
        if (! (conversation && _phoneInput)) {
            return;
        }
        this.setState({isLoading: true});
        await sendConversation(conversation, _phoneInput);

        this.setState({
            isLoading: false,
            phoneInput: ''
        });
        message.success(`Sent conversation to phone "${_phoneInput}"`);
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
        const {isLoading, input, inputCopy, output, canAlsoReplyInputVisible, canAlsoReplyInput, conversation, mode, phoneInput} = this.state;

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
                                    style={{width:'60px'}}
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
                    <Row>
                        <Col sm={14} md={12} lg={10}>
                            {conversation && <Paragraph style={{paddingTop:'14px'}}>
                                <Search
                                    value={phoneInput}
                                    onChange={this.handlePhoneInputChange}
                                    onPressEnter={this.handlePhoneInputPressEnter}
                                    onSearch={this.handlePhoneInputPressEnter}
                                    placeholder={phoneInputPlaceholder}
                                    addonBefore={'Send conversation to: '}
                                    prefix={'+1 '}
                                    enterButton={'Send'}
                                />
                            </Paragraph>}
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

const inputPlaceholder = 'Try: How are you?';
const canAlsoReplyInputPlaceholder = 'Type in what to reply';
const conversationPlaceholder = 'Conversation will be recorded here';
const phoneInputPlaceholder = 'E.g. 3522261234';

async function getAIResponse(input) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=getairesponse&input=${input}`);
    return response.data;
}

async function setAIResponse(input, output) {
    return await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=setairesponse&input=${input}&output=${output}`);
}

async function forgetAIResponse(input, output) {
    return await axios.delete(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=forgetairesponse&input=${input}&output=${output}`)
}

async function sendConversation(conversation, phone) {
    return await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=sendconversation&conversation=${conversation.replace(/\n/g, '___')}&phone=${phone}`);
}

async function sleep() {
    return await new Promise((resolve) => setTimeout(() => resolve(), 200));
}