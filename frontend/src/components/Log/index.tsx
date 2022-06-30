import { useContext } from "react";
import { LogContext } from './providers';
import { Skeleton, Divider, Popconfirm, Button, notification, Empty } from "antd";
import { useEffect } from "react";
import { deleteAllBankLog, deleteBankLog, getBankLog } from "./services";
import { LogStateType, ServerResponseType } from "../../common/DataType";
import { changeResponseToClient } from '../../common/Utility';
import { Base64 } from "js-base64";
import {
  BankOutlined,
  DeleteOutlined
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

  const { state, setState } = useContext(LogContext)

  const load = () => {
    setState((state: LogStateType) => {
      return {
        ...state,
        loading: true
      }
    })

    getBankLog().then((res: any) => {
      setState((state: LogStateType) => {
        let rows = res.map((row: any) => changeResponseToClient(row))
        return {
          ...state,
          bankLogRows: rows.map((row: any) => ({ ...row, logs: JSON.parse(Base64.decode(row.logs)) })),
          loading: false
        }
      })
    })
  }

  useEffect(() => {
    load()
  }, [])

  const handleDeleteBankLog = (id: string) => {
    deleteBankLog(id).then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()
    })
  }

  const handleDeleteAllBankLog = () => {
    deleteAllBankLog().then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()
    })
  }

  return (
    <>
      {
        state.loading ?
          (<LoadingSkelton count={5} />) : (
            <div>
              <Popconfirm
                title="Are you sure to delete all logs?"
                onConfirm={handleDeleteAllBankLog}
                okText="Yes"
                cancelText="No"
              >
                <Button className="float-right mb-2" danger>Delete All Logs</Button>
              </Popconfirm>
              <Divider />
              {
                state.bankLogRows.length === 0 ?
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :

                state.bankLogRows.map((row: any) => {
                  return (
                    <div>
                      <div className="float-right">
                        <Popconfirm
                          title="Are you sure to delete this log?"
                          onConfirm={() => { handleDeleteBankLog(row.id) }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined className="!text-stone-500 hover:!text-stone-200 duration-300 cursor-pointer " />&nbsp;
                        </Popconfirm>
                      </div>
                      <span className="text-orange-600">{row.botId}</span>
                      <div className="flex text-stone-400"><BankOutlined className='mt-1' />&nbsp;<span className="">{row.application}</span></div>
                      <p>
                        {
                          Object.keys(row.logs).map((key: string) => {
                            return (
                              <div className="text-stone-400 cursor-default">
                                {key} : <span className="hover:text-stone-400 duration-300">{row.logs[key]}</span>
                              </div>
                            )
                          })
                        }
                        <span className="text-stone-500 float-right">{new Date(row.createdAt).toLocaleString()}</span>
                      </p>
                      <Divider />
                    </div>
                  )
                })
              }
            </div>
            // <List
            //   itemLayout="horizontal"
            //   dataSource={state.bankLogRows}
            //   renderItem={(item: BankLogRowType) => (
            //     <List.Item>
            //       <List.Item.Meta
            //         avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
            //         title={<span className="text-orange-800">{item.botId}</span>}
            //         description={Base64.decode(item.logs)}
            //       />
            //       <span className="text-stone-500">{new Date(item.createdAt).toLocaleDateString()}</span>
            //     </List.Item>
            //   )}
            // />
          )
      }


    </>

  )
}