import React, { Component } from 'react';
import { Typography, Row, Col, message, Spin, Select, Input, Button } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

export class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            type: '',
            content: ''
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTypeChange(value) {
        this.setState({type: value});
    }
    handleContentChange(event) {
        this.setState({content: event.target.value});
    }
    async handleSubmit() {
        const {type, content} = this.state;
        const _content = content.trim();
        if (_content.length > 240) {
            return message.info('Cannot send feedback longer than 240 characters');
        }
        if (! (type && _content)) {
            return;
        }
        this.setState({isLoading: true});
        await sendCustomerFeedback(type, _content);

        this.setState({
            isLoading: false,
            content: ''
        });
        message.success(`Thank you for submitting the ${type} feedback!`);
    }

    render() {
        const {isLoading, content} = this.state;

        return (
            <div>
                <Spin spinning={isLoading} size={'large'}>
                    <Title level={3}>Feedback</Title>
                    <Row>
                        <Col span={24}>
                            <Select style={{width:'200px'}} onChange={this.handleTypeChange} placeholder='Choose a type'>
                                <Option value='featureRequest'>Feature Request</Option>
                                <Option value='issues'>Issues</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{paddingTop:'14px'}}>
                        <Col span={24}>
                            <TextArea
                                value={content}
                                onChange={this.handleContentChange}
                                autoSize={{minRows: 10}}
                                placeholder={'Fill in details'}
                                rows={10}
                            />
                        </Col>
                    </Row>
                    <Row style={{paddingTop:'14px'}}>
                        <Col span={24}>
                            <Button type='primary' onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

async function sendCustomerFeedback(type, content) {
    return await axios.post(`https://bhrd8g11q3.execute-api.us-east-2.amazonaws.com/test?type=setairesponse&input=feedbackfeedbackfeedbackfeedback_${type}&output=${content}`);
}