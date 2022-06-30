import { Card, Affix } from 'antd';
import BotTable from "../../components/Bot/BotTable";
import BotSearch from "../../components/Bot/BotSearch";
import { BotProvider } from '../../components/Bot/providers';
import BotSetting from '../../components/Bot/BotSetting';
import BotInfo from '../../components/Bot/BotInfo';
import BotTab from '../../components/Bot/BotTab';

const InjectList = () => {
  return (
    <>
      <h2 className='text-center mb-8 text-4xl'>
        Bots List
      </h2>
      <BotProvider>
        <div className='m-4'>
          <Card size="small" className='!rounded-xl hover:!shadow-red-600 shadow-md duration-300 w-full !m-auto !pt-4'>
            <BotSearch />
            <BotSetting />
            <BotTable />
            <BotInfo />
          </Card>
        </div>
        <Affix offsetBottom={8}>
          <BotTab />
        </Affix>
      </BotProvider>
    </>)
};

export default InjectList