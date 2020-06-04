import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { AudioTwoTone, ClockCircleOutlined, FolderOpenOutlined, DollarTwoTone } from '@ant-design/icons';
import {Chatbot} from './Chatbot';
import {Resources} from './Resources';
import {Releases} from './Releases';
import {Sponsor} from './Sponsor';
const { Header, Content, Footer, Sider } = Layout;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationKey: 'Chatbot'
        };
        this.handleNavigationChange = this.handleNavigationChange.bind(this);
    }
    handleNavigationChange(event) {
        this.setState({navigationKey: event.key});
    }

    render() {
        const {title} = this.props;
        const {navigationKey} = this.state;

        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider collapsible theme={'light'}>
                    <Menu theme='light'
                          defaultSelectedKeys={['Chatbot']}
                          mode='inline'
                          style={{fontSize:'14px',paddingTop:'20px'}}
                          onClick={this.handleNavigationChange}
                    >
                        <Menu.Item key='Chatbot' icon={<AudioTwoTone style={{fontSize:'20px'}} />}>
                            Chatbot
                        </Menu.Item>
                        <Menu.Item key='Releases' icon={<ClockCircleOutlined style={{fontSize:'20px'}} />}>
                            Releases
                        </Menu.Item>
                        <Menu.Item key='Resources' icon={<FolderOpenOutlined style={{fontSize:'20px'}} />}>
                            Resources
                        </Menu.Item>
                        <Menu.Item key='Sponsor' icon={<DollarTwoTone twoToneColor={'#FFDF00'} style={{fontSize:'20px'}} />}>
                            Sponsor
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <div style={{color:'#FFFFFF',fontSize:'20px'}}>{title}</div>
                    </Header>
                    <Content>
                        <div style={{padding:'20px'}}>
                            {
                                (navigationKey === 'Chatbot')   ?   <Chatbot />     :
                                (navigationKey === 'Releases')  ?   <Releases />    :
                                (navigationKey === 'Resources') ?   <Resources />   :
                                (navigationKey === 'Sponsor')   ?   <Sponsor />     :
                                                                    null
                            }
                        </div>
                    </Content>
                    <Footer style={{textAlign:'center'}}>
                        <div>
                            <img src={'shawn.jpeg'} width='100' alt={'shawn the sheep'} />
                        </div>
                        <div>
                            ShuaishuaiAI 2020
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}