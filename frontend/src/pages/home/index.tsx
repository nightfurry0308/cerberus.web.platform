import { Row, Col, Spin } from 'antd';
import { useState } from 'react';
import Builder from "../../components/home/Builder";

const Home = () => {
    const [imageLoading, setImageLoading] = useState(true)

    return (
        <>
            <h2 className='text-center mb-8 text-4xl'>
                Welcome to Cerberus V10
            </h2>
            <div className='w-[1200px] m-auto'>
                <Row>
                    <Col span={12}>
                        <Spin spinning={imageLoading}>
                            <img src="./images/home.png" alt="" className='w-4/5 mt-8' onLoad={() => { setImageLoading(false) }} />
                        </Spin>
                    </Col>
                    <Col span={12}>
                        <Builder />
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default Home