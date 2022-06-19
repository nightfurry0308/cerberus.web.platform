import { Row, Col, Spin } from 'antd';
import { useState } from 'react';
import AddForm from "../../components/inject/AddForm";
import InjectTable from "../../components/inject/InjectTable";
import { InjectProvider } from '../../components/inject/providers';

const InjectList = () => {
    const [imageLoading, setImageLoading] = useState(true)

    return (
        <>
            <h2 className='text-center mb-8 text-4xl'>
                Inject List
            </h2>
            <InjectProvider>
                <div className='!w-[1000px] !m-auto'>
                    <Row className='mb-12'>
                        <Col span={12} className='pr-2'>
                            <Spin spinning={imageLoading}>
                                <img src="./images/inject.jpg" alt="" className='rounded-lg	h-[326px] m-auto' onLoad={() => {setImageLoading(false)}} />
                            </Spin>
                        </Col>
                        <Col span={12} className='pl-2'>
                            <AddForm />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <InjectTable />
                        </Col>
                    </Row>
                </div>
            </InjectProvider>
        </>)
};

export default InjectList