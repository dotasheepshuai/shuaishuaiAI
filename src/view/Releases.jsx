import React, { Component } from 'react';
import { Timeline, Typography } from 'antd';
import {Components} from '../constants';
const { Title, Text } = Typography;

export class Releases extends Component {
    render() {
        return (
            <div>
                <Title level={3}>Releases</Title>
                <Timeline>
                    <Timeline.Item color='green'>
                        v0.1 [2020/05/31] Add input box and dummy logic to handle input
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.2 [2020/05/31] Pass input to backend API, which queries against DynamoDB for AI response
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.3 [2020/06/01] Add training functionality to let AI evolve
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.4 [2020/06/03] UI improvements and sponsor page
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.5 [2020/06/05] Remove answers by clicking dislike button
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.6 [2020/06/05] Add sleep mode and in-typing functionality to emulate human
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.7 [2020/06/05] Add music component
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.8 [2020/06/06] Choose closest question's answers as AI response
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.9 [2020/06/06] Conversation export functionality
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.10 [2020/06/07] Add blacklisted words to emulate human behavior
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.11 [2020/06/07] Add feedback system to collect feature requests and issues
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.12 [2020/06/08] Display anniversary page on anniversaries
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.13 [2020/06/08] Upgrade music component to include more songs
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v0.14 [2020/06/08] Distribute the website using customized domain name
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        <Text strong>v1.0 [2020/06/09] LAUNCH!</Text>{Components.Rocket}
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        v1.1 [2020/06/22] Add first times page to record and display first times
                    </Timeline.Item>
                    <Timeline.Item dot={Components.Loading}>
                        What's next... submit a request!
                    </Timeline.Item>
                </Timeline>
            </div>
        );
    }
}