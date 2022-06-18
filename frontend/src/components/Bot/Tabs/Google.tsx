import { useContext, useState } from 'react';
import { Button, Input, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default () => {
  const { state, setState } = useContext(BotContext)

  const submit = () => {
    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"startAuthenticator2"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }

  return (
    <div className="pb-6">
      <h2 className="text-xl">Google Authenticator grabber</h2>
      <p className="text-stone-500">Get data from google authenticator on selected bots</p>
      <Button ghost type="primary" className="float-right" onClick={submit}>Google Auth</Button>
    </div>
  )
}