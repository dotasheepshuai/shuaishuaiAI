import React, { Component } from 'react';
import { Input } from 'antd';
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
    handleInputPressEnter() {
        const {input, conversation} = this.state;

        const newConversation =
            conversation +
            `You: ${input}\n` +
            `AI: ${getAIResponse(input)}\n`;

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

function getAIResponse(input) {
    // TODO: fill in AI logic
    return input.replace('?', '!');
}