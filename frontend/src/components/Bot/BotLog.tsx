import { Empty, Modal, List, notification, Popconfirm, Skeleton } from "antd"
import { BotContext } from './providers';
import { useContext } from 'react';
import { deleteBotLog } from './services';
import { BotStateType, ServerResponseType } from '../../common/DataType';
import { Base64 } from "js-base64"
import { getLog } from './services';
import { changeResponseToClient } from '../../common/Utility';
import {
  ReloadOutlined
} from '@ant-design/icons';

const LoadingSkelton = ({ count }: { count: number }) => {
  return (
    <>
      {
        Array.from(Array(count)).map((v, i) => <Skeleton key={i} />)
      }
    </>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
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

  const refresh = () => {
    setState((state: BotStateType) => ({
      ...state,
      botLogModal: true,
      botLogLoading: true
    }))

    getLog(state.botId, state.botLogType).then((res: any) => {

      setState((state: BotStateType) => ({
        ...state,
        botLogLoading: false,
        botTypeLogs: res?.map((item: any) => (changeResponseToClient(item)))
      }))
    })

  }

  return (
    <Modal centered visible={state.botLogModal} okButtonProps={{ style: { display: 'none' } }} onCancel={() => { setState((state: BotStateType) => ({ ...state, botLogModal: false })) }} width={1000}>
      <div className="pb-6">
        <ReloadOutlined onClick={refresh} className="float-right text-xl !text-stone-500 hover:!text-stone-50 duration-300 pr-8 cursor-pointer" />
        <h2 className="text-xl mb-8">{state.botId}</h2>


        {/* <p className="text-stone-500">Bot Logs Here</p> */}
        <Popconfirm
          title="Are you sure to delete this logs?"
          onConfirm={clearLog}
          okText="Yes"
          cancelText="No"
        >
          <span className="text-orange-400 hover:text-orange-600 duration-300 cursor-pointer">Clear logs</span>
        </Popconfirm>
        {
          state.botLogLoading ? <LoadingSkelton count={5} /> : (
            <div>
              {
                state.botTypeLogs.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                  <List
                    itemLayout="horizontal"
                    dataSource={state.botTypeLogs}
                    className='h-96 overflow-y-auto'
                    renderItem={(item: any) => (
                      <List.Item className="!pb-1 !pt-1">
                        <List.Item.Meta
                          // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                          // title={<span className="text-orange-800">{new Date(item.createdAt).toLocaleDateString()}</span>}
                          description={item.logs === '' ? '' : Base64.decode(item.logs)}
                        />
                        {/* <span className="text-stone-500">{new Date(item.createdAt).toLocaleDateString()}</span> */}
                      </List.Item>
                    )}
                  />
                )
              }

            </div>
          )
        }
      </div>
    </Modal>
  )
}