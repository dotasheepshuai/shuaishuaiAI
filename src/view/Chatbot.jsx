import React, { Component } from 'react';
import { Input, Typography, Button, message, Row, Col } from 'antd';
import axios from "axios";
const { TextArea, Search } = Input;
const { Paragraph } = Typography;

export class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    handleInputChange(event) {
        this.setState({input: event.target.value})
    }
    async handleInputPressEnter() {
        const {input, conversation} = this.state;
        const output = await getAIResponse(input);

        this.setState({
            input: '',
            inputCopy: input,
            output: output,
            insteadSayInputVisible: false,
            insteadSayInput: '',
            conversation: `${conversation}You: ${input}\nAI: ${output}\n`
        });
    }

    handleInsteadSayInputChange(event) {
        this.setState({insteadSayInput: event.target.value})
    }
    async handleInsteadSayInputPressEnter() {
        const {inputCopy, insteadSayInput, conversation} = this.state;
        await setAIResponse(inputCopy, insteadSayInput);

        this.setState({
            input: '',
            inputCopy: '',
            output: '',
            insteadSayInputVisible: false,
            insteadSayInput: '',
            conversation: `${conversation}You: ${inputCopy}\nAI: ${insteadSayInput}\n`
        });
        message.success(`Remembered to reply "${insteadSayInput}" for question "${inputCopy}"`);
    }

    render() {
        const {input, inputCopy, output, insteadSayInputVisible, insteadSayInput, conversation} = this.state;
        return (
            <div>
                <Row>
                    <Col sm={14} md={10} lg={6}>
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
                        <Paragraph>AI: {output}</Paragraph>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={10}>
                        {output && <Button type="primary" onClick={() => this.setState({insteadSayInputVisible: true})}>Instead, say...</Button>}
                    </Col>
                    <Col sm={12} md={12} lg={10}>
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
                            rows={20}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const inputPlaceholder = 'Try: How are you?';
const insteadSayInputPlaceholder = 'Type in what instead say';
const conversationPlaceholder = 'Conversations will be recorded here';

async function getAIResponse(input) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}`);
    return response.data;
}

async function setAIResponse(input, output) {
    await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}&output=${output}`);
}