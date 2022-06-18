import { Row, Col } from 'antd';
import Builder from "../../components/home/Builder";

const Home = () => {

    return (
        <>
            <h2 className='text-center mb-8 text-4xl'>
                Welcome to Cerberus V10
            </h2>
            <Row>
                <Col offset={4} span={8}>
                    <img src="./images/home.png" alt="" className='w-4/5 mt-8' />
                </Col>
                <Col span={8}>
                    <Builder />
                </Col>
            </Row>
        </>
    )
};

export default Home