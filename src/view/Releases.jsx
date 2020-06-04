import React, { Component } from 'react';
import { Timeline, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
const { Title } = Typography;

export class Releases extends Component {
    render() {
        return (
            <div>
                <Title level={3}>Releases</Title>
                <Timeline>
                    <Timeline.Item color='green'>
                        v0.1 Add input box and dummy logic to handle input
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.2 Pass input to backend API, which queries against dynamoDB for AI response
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.3 Add training functionality to let AI evolve
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.4 UI improvements and sponsor page
                    </Timeline.Item>
                    <Timeline.Item dot={<SyncOutlined spin style={{fontSize:'20px',backgroundColor:'rgb(240,242,245)'}} />}>
                        v0.5 Add sleep mode and in-typing functionality to emulate human
                    </Timeline.Item>
                    <Timeline.Item color='grey'>
                        v0.6 Choose closest question's answers as AI response
                    </Timeline.Item>
                    <Timeline.Item color='grey'>
                        v0.7 Conversation export functionality
                    </Timeline.Item>
                    <Timeline.Item color='grey'>
                        v0.8 Add blacklisted words to emulate human behavior
                    </Timeline.Item>
                </Timeline>
            </div>
        );
    }
}