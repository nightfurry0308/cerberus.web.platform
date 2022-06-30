import { Modal } from 'antd';
import { useContext } from 'react';
import { BotContext } from './providers';
import { BotStateType } from '../../common/DataType';
import {
  BankOutlined
} from '@ant-design/icons';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { state, setState } = useContext(BotContext)

  const handleOk = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botBankInfoModal: false
      }
    })
  };

  const handleCancel = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botBankInfoModal: false
      }
    })
  }

  return (
    <Modal centered title="Bank Information" visible={state.botBankInfoModal} onOk={handleOk} onCancel={handleCancel}>
      <div>
        {
          state.botBankInfoLogs.map((row: any) => {
            return (
              <div>
                <span className="text-orange-600 cursor-pointer hover:text-orange-400 duration-300">{row.botId}</span>
                <div className="flex "><BankOutlined className='mt-1' />&nbsp;<span className="">{row.application}</span></div>
                <p>
                  {
                    Object.keys(row.logs).map((key: string) => {
                      return (
                        <div className="cursor-default">
                          {key} : <span className="hover:text-stone-400 duration-300">{row.logs[key]}</span>
                        </div>
                      )
                    })
                  }
                  <span className="text-stone-500 float-right">{new Date(row.createdAt).toLocaleString()}</span>
                </p>
                {/* <Divider /> */}
              </div>
            )
          })
        }
      </div>
    </Modal>

  )
}