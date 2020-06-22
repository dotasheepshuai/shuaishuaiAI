import React from 'react';
import {
    CrownTwoTone,
    StarTwoTone,
    HeartTwoTone,
    RocketTwoTone,
    AudioTwoTone,
    HistoryOutlined,
    FolderOpenOutlined,
    DollarTwoTone,
    ToolOutlined,
    DislikeTwoTone,
    LoadingOutlined
} from '@ant-design/icons';

// Keep in sync with backend
export const Anniversaries = [
    {
        componentName: 'ShuaishuaiBirthday',
        date: '1991-12-19'
    },
    {
        componentName: 'FatsheepBirthday',
        date: '1992-12-17'
    },
    {
        componentName: 'FirstConversation',
        date: '2020-04-28'
    },
    {
        componentName: 'VersionOneLaunch',
        date: '2020-06-09'
    },
    {
        componentName: 'FirstTimesDay',
        date: '2020-12-18'
    }
];

export const Components = {
    Crown: <CrownTwoTone twoToneColor={'#D4AF37'} style={{fontSize:'20px'}} />,
    Star: <StarTwoTone twoToneColor={'#FFD700'} style={{fontSize:'20px'}} />,
    Heart: <HeartTwoTone twoToneColor={'#EB2F96'} style={{fontSize:'20px'}} />,
    Rocket: <RocketTwoTone twoToneColor={'#800080'} style={{fontSize:'20px'}} />,
    Audio: <AudioTwoTone style={{fontSize:'20px'}} />,
    History: <HistoryOutlined style={{fontSize:'20px'}} />,
    Folder: <FolderOpenOutlined style={{fontSize:'20px'}} />,
    Dollar: <DollarTwoTone twoToneColor={'#D4AF37'} style={{fontSize:'20px'}} />,
    Tool: <ToolOutlined style={{fontSize:'20px'}} />,
    Dislike: <DislikeTwoTone twoToneColor={'#FF0000'} style={{fontSize:'20px'}} />,
    Loading: <LoadingOutlined spin style={{fontSize:'20px',backgroundColor:'rgb(240,242,245)'}} />
};