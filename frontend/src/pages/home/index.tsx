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
            <Row>
                <Col offset={4} span={8}>
                    <Spin spinning={imageLoading}>
                        <img src="./images/home.png" alt="" className='w-4/5 mt-8' onLoad={() => {setImageLoading(false)}}/>
                    </Spin>
                </Col>
                <Col span={8}>
                    <Builder />
                </Col>
            </Row>
        </>
    )
};

export default Home