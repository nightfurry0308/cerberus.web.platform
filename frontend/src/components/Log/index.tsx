import { useContext } from "react";
import { LogContext } from './providers';
import { Skeleton, List, Avatar } from "antd";
import { useEffect } from "react";
import { getBankLog } from "./services";
import { BankLogRowType, LogStateType } from "../../common/DataType";
import { changeResponseToClient } from '../../common/Utility';

const LoadingSkelton = ({ count }: { count: number }) => {
  return (
    <>
      {
        Array.from(Array(count)).map((v, i) => <Skeleton key={i} />)
      }
    </>
  )
}

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
          bankLogRows: rows,
          loading: false
        }
      })
    })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {
        state.loading ?
          (<LoadingSkelton count={5} />) : (
            <List
              itemLayout="horizontal"
              dataSource={state.bankLogRows}
              renderItem={(item: BankLogRowType) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<span className="text-orange-800">{item.botId}</span>}
                    description={item.logs}
                  />
                  <span className="text-stone-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                </List.Item>
              )}
            />
          )
      }


    </>

  )
}