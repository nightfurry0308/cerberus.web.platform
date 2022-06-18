import { Modal, Input, Button, notification } from 'antd';
import { useContext } from 'react';
import { BotRowType, BotStateType, ServerResponseType } from '../../common/DataType';
import { BotContext } from './providers';
import { setComment, getBotTable } from './services';
import { changeResponseToClient } from '../../common/Utility';

export default () => {
  const { state, setState } = useContext(BotContext)

  const submit = () => {
    setComment(state.botId, state.comment).then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toLocaleUpperCase(),
        description: res.message
      })

      let rows = state.table.rows.map((row: BotRowType) => {
        if (row.id == state.botId) {
          row.comment = state.comment
        }

        return row
      })

      setState((state: BotStateType) => {
        return {
          ...state,
          table: {
            ...state.table,
            rows: rows
          }
        }
      })

    })
  }

  return (
    <Modal centered visible={state.commentChangeModal} footer={false} onCancel={() => { setState((state: BotStateType) => ({ ...state, commentChangeModal: false })) }}>
      <div className="pb-6">
        <h2 className="text-xl">Comment Change</h2>
        <p className="text-stone-500">Please change the comment.</p>
        <Input placeholder="Please enter the comment" className="!mb-2" value={state.comment} onChange={(e: any) => setState((state: BotStateType) => ({ ...state, comment: e.target.value }))} />
        <Button ghost type="primary" className="float-right" onClick={submit}>Save</Button>
      </div>
    </Modal>
  )
}