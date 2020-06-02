import React, { Component } from 'react';
import { Input, Typography, Button, Space, Row, Col } from 'antd';
import axios from "axios";
const { TextArea } = Input;
const { Text } = Typography;

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
    }

    render() {
        const {input, inputCopy, output, insteadSayInputVisible, insteadSayInput, conversation} = this.state;
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Input
                            value={input}
                            onChange={this.handleInputChange}
                            onPressEnter={this.handleInputPressEnter}
                            placeholder={inputPlaceholder}
                            prefix={'> '}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Text>You: {inputCopy}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Space>
                            <Text>AI: {output}</Text>
                            {output && <Button type="primary" onClick={() => this.setState({insteadSayInputVisible: true})}>Instead, say...</Button>}
                        </Space>
                    </Col>
                    <Col span={6}>
                        {insteadSayInputVisible && <Input
                            value={insteadSayInput}
                            onChange={this.handleInsteadSayInputChange}
                            onPressEnter={this.handleInsteadSayInputPressEnter}
                            placeholder={insteadSayInputPlaceholder}
                            prefix={'> '}
                        />}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col span={24}>
                        <TextArea
                            value={conversation}
                            autoSize={{minRows: 20}}
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
const insteadSayInputPlaceholder = 'Type in what instead say, and hit ENTER';
const conversationPlaceholder = 'Conversation will be recorded here';

async function getAIResponse(input) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}`);
    return response.data;
}

async function setAIResponse(input, output) {
    await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}&output=${output}`);
}