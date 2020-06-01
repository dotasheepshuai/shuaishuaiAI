import React, { Component } from 'react';
import { Input } from 'antd';
import axios from "axios";
const { TextArea } = Input;

export class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            conversation: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPressEnter = this.handleInputPressEnter.bind(this);
    }

    handleInputChange(event) {
        this.setState({input: event.target.value})
    }
    async handleInputPressEnter() {
        const {input, conversation} = this.state;

        const newConversation =
            conversation +
            `You: ${input}\n` +
            `AI: ${await getAIResponse(input)}\n`;

        this.setState({
            input: '',
            conversation: newConversation
        });
    }

    render() {
        const {input, conversation} = this.state;
        return (
            <div>
                <Input
                    value={input}
                    onChange={this.handleInputChange}
                    onPressEnter={this.handleInputPressEnter}
                    placeholder={inputPlaceholder}
                    prefix={'> '}
                />
                <hr />
                <TextArea
                    value={conversation}
                    autoSize={{minRows: 20}}
                    placeholder={conversationPlaceholder}
                    readOnly={true}
                    rows={20}
                />
            </div>
        );
    }
}

const inputPlaceholder = 'Try: How are you?';
const conversationPlaceholder = 'Conversation will be recorded here';

async function getAIResponse(input) {
    const response = await axios.get(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?input=${input}`);
    return response.data;
}