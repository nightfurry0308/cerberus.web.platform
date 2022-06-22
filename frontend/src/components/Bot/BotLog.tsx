import { Empty, Modal, Avatar, List, notification, Popconfirm } from "antd"
import { BotContext } from './providers';
import { useContext } from 'react';
import { deleteBotLog } from './services';
import { BotStateType, ServerResponseType } from '../../common/DataType';
import { Base64 } from "js-base64"

export default () => {
  const { state, setState } = useContext(BotContext)

  const clearLog = () => {
    deleteBotLog(state.botId, state.botLogType).then((res: ServerResponseType) => {
        notification['info']({
          message: res.type.toUpperCase(),
          description: res.message
        })

        if (res.type === 'success') {
          setState((state: BotStateType) => {
            return {
              ...state,
              botTypeLogs: [] 
            }
          })
        }
    })
  }

  return (
    <Modal centered visible={state.botLogModal} okButtonProps={{ style: { display: 'none' } }} onCancel={() => { setState((state: BotStateType) => ({ ...state, botLogModal: false })) }} width={600}>
      <div className="pb-6">
        <h2 className="text-xl">{state.botId}</h2>
        {/* <p className="text-stone-500">Bot Logs Here</p> */}
        <Popconfirm
          title="Are you sure to delete this logs?"
          onConfirm={clearLog}
          okText="Yes"
          cancelText="No"
        >
        <a >Clear logs</a>
        </Popconfirm>
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
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    // title={<span className="text-orange-800">{new Date(item.createdAt).toLocaleDateString()}</span>}
                    description={Base64.decode(item.logs)}
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