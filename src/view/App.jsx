import React, { Component } from 'react';
import { Layout, Menu, Card, Row, Col, Select, Button } from 'antd';
import { CustomerServiceTwoTone } from '@ant-design/icons';
import {Chatbot} from './Chatbot';
import {Resources} from './Resources';
import {Releases} from './Releases';
import {Sponsor} from './Sponsor';
import {Feedback} from './Feedback';
import {Anniversary} from './Anniversary';
import {isAnniversary} from '../common';
import {Components} from '../constants';
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

export class App extends Component {
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
                        <Menu.Item key='Chatbot' icon={Components.Audio}>
                            Chatbot
                        </Menu.Item>
                        <Menu.Item key='Releases' icon={Components.History}>
                            Releases
                        </Menu.Item>
                        <Menu.Item key='Resources' icon={Components.Folder}>
                            Resources
                        </Menu.Item>
                        <Menu.Item key='Sponsor' icon={Components.Dollar}>
                            Sponsor
                        </Menu.Item>
                        <Menu.Item key='Feedback' icon={Components.Tool}>
                            Feedback
                        </Menu.Item>
                        {isAnniversary() && <Menu.Item key='Anniversary' icon={Components.Heart}>
                            Anniversary
                            </Menu.Item>
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header>
                        <div style={{color:'#FFFFFF',fontSize:'20px'}}>{title}</div>
                    </Header>
                    <Content>
                        <div style={{padding:'20px'}}>
                            {
                                (navigationKey === 'Chatbot')       ?   <Chatbot />     :
                                (navigationKey === 'Releases')      ?   <Releases />    :
                                (navigationKey === 'Resources')     ?   <Resources />   :
                                (navigationKey === 'Sponsor')       ?   <Sponsor />     :
                                (navigationKey === 'Feedback')      ?   <Feedback />    :
                                (navigationKey === 'Anniversary')   ?   <Anniversary /> :
                                                                        null
                            }
                        </div>
                    </Content>
                    <Footer>
                        <Row>
                            <Col span={8}>
                                <MusicComponent />
                            </Col>
                            <Col span={8}>
                                <div style={{textAlign:'center'}}>
                                    <div>
                                        <img src={'shaun.jpeg'} height='100' alt={'shaun the sheep'} />
                                    </div>
                                    <div>
                                        ShuaishuaiAI 2020
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

class MusicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            source: './music/MachineBell.mp3'
        };
        this.handleMusicChange = this.handleMusicChange.bind(this);
        this.handlePauseResume = this.handlePauseResume.bind(this);
    }

    handleMusicChange(value) {
        document.getElementById('pauseResume').classList.add('anticon-spin');
        document.getElementById('audio').play();
        this.setState({
            isPlaying: true,
            source: `./music/${value}.mp3`
        });
    }

    handlePauseResume() {
        const {isPlaying} = this.state;
        if (isPlaying) {
            document.getElementById('pauseResume').classList.remove('anticon-spin');
            document.getElementById('audio').pause();
            this.setState({isPlaying: false});
        } else {
            document.getElementById('pauseResume').classList.add('anticon-spin');
            document.getElementById('audio').play();
            this.setState({isPlaying: true});
        }
    }

    componentDidMount() {
        document.getElementById('audio').volume = 0.06;
    }

    render() {
        const {source} = this.state;
        return (
            <div>
                <Card title={'Music'} style={{width:'300px',height:'114px'}}>
                    <Select showSearch style={{width:'200px'}} defaultValue={'MachineBell'} onChange={this.handleMusicChange} placeholder='Choose a song'>
                        <Option value='Drenched'>Drenched - Wanting Qu</Option>
                        <Option value='LoveCourage'>Love Courage - Wanting Qu</Option>
                        <Option value='MachineBell'>Machine Bell - Wei Zhang</Option>
                        <Option value='MySecret'>My Secret - G.E.M</Option>
                        <Option value='MySky'>My Sky - NZBZ</Option>
                        <Option value='NobodyIsland'>Nobody Island - Ran Ren</Option>
                        <Option value='OneDay'>One Day - Matisyahu</Option>
                        <Option value='PeopleSea'>People Sea - Chi Yan</Option>
                        <Option value='SeeYou'>See You - G.E.M</Option>
                        <Option value='SummerWind'>Summer Wind - Lan Wen</Option>
                    </Select>
                    <Button
                        type='link'
                        icon={<CustomerServiceTwoTone id='pauseResume' twoToneColor={'#4CBB17'} style={{fontSize:'28px'}} />}
                        style={{width:'60px',height:'auto'}}
                        onClick={this.handlePauseResume}
                    />
                    <audio id='audio' autoPlay={true} loop={true} src={source} />
                </Card>
            </div>
        );
    }
}