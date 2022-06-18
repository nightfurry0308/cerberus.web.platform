import React, { useContext, useEffect, useRef } from 'react';
import { Table, Pagination, Card, Select, notification, Spin } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { InjectContext } from './providers';
import { InjectRowType, InjectStateType, ServerResponseType } from '../../common/DataType';
import {
  CheckCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { deleteInject, getInjectList } from './services';

const { Option } = Select

const App: React.FC = () => {

  const { state, setState } = useContext(InjectContext)

  const initUpdate = useRef(true)

  useEffect(() => {
    if (initUpdate.current) {
      load()

      initUpdate.current = false
      return
    }
  }, [])

  useEffect(() => {
    load()
  }, [state.table.page, state.table.perPage])

  const load = () => {
    setState((state: InjectStateType) => ({...state, loading: true}))

    getInjectList(state.table.page, state.table.perPage).then((res: any) => {
      setState((state: InjectStateType) => ({
        ...state,
        loading: false,
        table: {
          ...state.table,
          rows: res.rows,
          count: res.count
        }
      }))
    })
  }

  const handleDeleteInject = (id: number) => {
    deleteInject(id).then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })
      load()
    })
  }

  const columns: ColumnsType<InjectRowType> = [
    {
      title: 'Android App Name',
      dataIndex: 'app',
      key: 'app'
    },
    {
      title: 'HTML',
      dataIndex: 'html',
      key: 'html',
      render: () => (
        <>
          <CheckCircleOutlined className='!text-green-400' />
        </>
      ),
    },
    {
      title: 'PNG',
      dataIndex: 'png',
      key: 'png',
      render: () => (
        <>
          <CheckCircleOutlined className='!text-green-400' />
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: InjectRowType) => (
        <DeleteOutlined onClick={() => handleDeleteInject(record.id)} className='!text-red-500 cursor-pointer hover:!text-red-600 duration-300' />
      ),
    },
  ];

  return (
    <Card size="small" className='!rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
      <h2 className='mb-2 text-xl text-center mt-2'>
        Inject Table
      </h2>
      <Select className='!mb-2' defaultValue={state.table.perPage} value={state.table.perPage} onChange={(v: string) => setState((state: InjectStateType) => ({ ...state, table: { ...state.table, perPage: v } }))}>
        <Option value='10'>10 / page</Option>
        <Option value='20'>20 / page</Option>
        <Option value='30'>30 / page</Option>
        <Option value='50'>50 / page</Option>
      </Select>
      <Spin spinning={state.loading}>
      <Table columns={columns} dataSource={state.table.rows} pagination={false}/>
      </Spin>
      <Pagination className='float-right !pt-2' defaultCurrent={state.table.page} total={state.table.count} pageSize={state.table.perPage} onChange={(page: number) => setState((state: InjectStateType) => ({...state, table: {...state.table, page: page}}))}/>
    </Card>
  )
}


export default App;