import { Layout, Menu, BackTop } from 'antd';
import { Route, Link, Routes } from 'react-router-dom';

import "./index.style.css"

import Home from "../home"
import Setting from "../setting"
import Contact from "../contact"
import Log from "../log"
import Inject from "../inject"
import Bot from "../bot"
import {
    VerticalAlignTopOutlined
} from '@ant-design/icons';

import { MenuItemType } from '../../common/DataType';
import Login from '../auth/login';
import Register from '../auth/register';

const { Header, Content, Footer } = Layout;

const MenuItem = ({ title, url }: MenuItemType) => (
    <Menu.Item className='!text-cyan-50 !p-4 hover:!text-red-700 hover:!bg-transparent font-semibold !mr-4'>
        <Link to={url}>
            {title}
        </Link>
    </Menu.Item>
)


const App = () => {
    const menus: MenuItemType[] = [
        { title: 'Home', url: '/home' },
        { title: 'Bots', url: '/bot' },
        { title: 'Logs', url: '/log' },
        { title: 'Inject List', url: '/inject' },
        { title: 'Settings', url: '/setting' },
        { title: 'Contact Us', url: '/contact' },
    ]

    return (
        <Layout className="layout !bg-neutral-800 !bg-cover	!bg-center !bg-gradient" >
            <Header className='!bg-transparent'>
                <Menu
                    theme="dark"
                    className='!bg-transparent !relative !flex !justify-center !font-sans !text-lg !mt-4'
                    mode="horizontal"
                >
                    <div className='logo float-left mr-4'>
                        <img src="./images/logo.png" alt="" className='!w-24' />
                    </div>
                    {
                        menus.map((menu: MenuItemType, i: number) => {
                            return (
                                <MenuItem url={menu.url} title={menu.title} key={i} />
                            )
                        })
                    }
                </Menu>
            </Header>
            <Content className="mt-32 mb-32">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/inject" element={<Inject />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/log" element={<Log />} />
                    <Route path="/bot" element={<Bot />} />
                </Routes>
            </Content>
            <BackTop>
                <div className='bg-stone-800 h-10 w-10 rounded-full text-center !border-stone-500 border leading-10'><VerticalAlignTopOutlined className='text-lg !font-extrabold'/></div>
            </BackTop>
            <Footer className="text-center">
                Cerberus @2022
            </Footer>
        </Layout >
    )
}

export default App;