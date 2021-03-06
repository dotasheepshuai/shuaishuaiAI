import React, { Component } from 'react';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

export class Resources extends Component {
    render() {
        return (
            <div>
                <Title level={3}>Resources</Title>
                <Paragraph>
                    <Text strong>Intro</Text> <SimpleLink link={introLink} />
                </Paragraph>
                <Paragraph>
                    <Text strong>Slack</Text> (team) <SimpleLink link={slackLink} />
                </Paragraph>
                <Paragraph>
                    <Text strong>Trello</Text> (task management) <SimpleLink link={trelloLink} />
                </Paragraph>
                <Paragraph>
                    <Text strong>Github</Text> (version control) <SimpleLink link={githubLink} /> <SimpleLink link={githubLinkBackend} />
                </Paragraph>
                <Paragraph>
                    <Text strong>AWS</Text> (service) tianyangliu921217@gmail.com
                </Paragraph>
            </div>
        );
    }
}

const introLink = 'https://docs.google.com/document/d/1jK-LIm3Ki8zupYtEjh7DyX_bOUnLxzMCFRixqDAtzCA/edit';
const slackLink = 'https://app.slack.com/client/T014EFMBLKW/D0146V1E821';
const trelloLink = 'https://trello.com/b/kmKYR0jp/shuaishuaiai';
const githubLink = 'https://github.com/dotasheepshuai/shuaishuaiAI';
const githubLinkBackend = 'https://github.com/dotasheepshuai/shuaishuaiAI-backend';

class SimpleLink extends Component {
    render() {
        const {link} = this.props;
        return <a href={link} target='_blank' rel='noopener noreferrer'>{link}</a>;
    }
}