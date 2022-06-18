import React from 'react';
import { Empty, Modal, Avatar, List, Space } from "antd"
import { BotContext } from './providers';
import { useContext, useEffect } from 'react';
import { getLog } from "./services";
import { BotStateType } from "../../common/DataType";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { changeResponseToClient } from '../../common/Utility';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default () => {
  const { state, setState } = useContext(BotContext)

  return (
    <Modal centered visible={state.botLogModal} okButtonProps={{ style: { display: 'none' } }} onCancel={() => { setState((state: BotStateType) => ({ ...state, botLogModal: false })) }} width={600}>
      <div className="pb-6">
        <h2 className="text-xl">{state.botId}</h2>
        {/* <p className="text-stone-500">Bot Logs Here</p> */}
        {
          state.botTypeLogs.length == 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={state.botTypeLogs}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<span className="text-orange-800">{new Date(item.createdAt).toLocaleDateString()}</span>}
                    description={item.logs}
                  />
                  {/* <span className="text-stone-500">{new Date(item.createdAt).toLocaleDateString()}</span> */}
                </List.Item>
              )}
            />
            )
        }
      </div>
    </Modal>
  )
}