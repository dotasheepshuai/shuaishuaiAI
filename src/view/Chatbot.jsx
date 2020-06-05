import React, { Component } from 'react';
import { Input, Typography, Button, message, Row, Col, Spin } from 'antd';
import { DislikeTwoTone } from '@ant-design/icons';
import axios from "axios";
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
            insteadSayInputVisible: false,
            insteadSayInput: '',
            conversation: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPressEnter = this.handleInputPressEnter.bind(this);
        this.handleInsteadSayInputChange = this.handleInsteadSayInputChange.bind(this);
        this.handleInsteadSayInputPressEnter = this.handleInsteadSayInputPressEnter.bind(this);
        this.handleDislikeButtonClick = this.handleDislikeButtonClick.bind(this);
    }

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }
    async handleInputPressEnter() {
        const {input, conversation} = this.state;
        if (! input) {
            return;
        }
        this.setState({isLoading: true});
        const output = await getAIResponse(input);

        this.setState({
            isLoading: false,
            input: '',
            inputCopy: input,
            output: output,
            insteadSayInputVisible: false,
            insteadSayInput: '',
            conversation: `${conversation}You: ${input}\nShuaishuai: ${output}\n`
        });
    }

    handleInsteadSayInputChange(event) {
        this.setState({insteadSayInput: event.target.value})
    }
    async handleInsteadSayInputPressEnter() {
        const {inputCopy, insteadSayInput, conversation} = this.state;
        if (! (inputCopy && insteadSayInput)) {
            return;
        }
        this.setState({isLoading: true});
        await setAIResponse(inputCopy, insteadSayInput);

        this.setState({
            isLoading: false,
            input: '',
            inputCopy: '',
            output: '',
            insteadSayInputVisible: false,
            insteadSayInput: '',
            conversation: `${conversation}You: ${inputCopy}\nShuaishuai: ${insteadSayInput}\n`
        });
        message.success(`Remembered to reply "${insteadSayInput}" for question "${inputCopy}"`);
    }

    async handleDislikeButtonClick() {
        const {inputCopy, output, conversation} = this.state;
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
            insteadSayInputVisible: false,
            insteadSayInput: '',
            conversation: conversation
        });
        message.success(`Forgot answer "${output}" for question "${inputCopy}"`);
    }

    render() {
        const {isLoading, input, inputCopy, output, insteadSayInputVisible, insteadSayInput, conversation} = this.state;
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
                                {output && <Button
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
                            {output && <Button type="primary" onClick={() => this.setState({insteadSayInputVisible: true})}>Instead say...</Button>}
                        </Col>
                        <Col sm={14} md={12} lg={10}>
                            {insteadSayInputVisible && <Search
                                value={insteadSayInput}
                                onChange={this.handleInsteadSayInputChange}
                                onPressEnter={this.handleInsteadSayInputPressEnter}
                                onSearch={this.handleInsteadSayInputPressEnter}
                                placeholder={insteadSayInputPlaceholder}
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
const insteadSayInputPlaceholder = 'Type in what to say instead';
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