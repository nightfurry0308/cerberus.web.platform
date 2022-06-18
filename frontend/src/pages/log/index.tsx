import { Card } from 'antd';
import Log from "../../components/Log"
import { LogProvider } from '../../components/Log/providers';

export default () => {
  return (
    <>
      <h2 className='text-center mb-8 text-4xl'>
        Logs
      </h2>
      <Card size="small" className='!rounded-xl mb-8 !w-[1000px] !m-auto !p-8'>
        <LogProvider>
          <Log />
        </LogProvider>
      </Card>
    </>
  )
}