import { Modal } from "antd"
import { useContext } from "react"
import { InjectStateType } from "../../common/DataType"
import { InjectContext } from "./providers"

export default () => {
  const { state, setState } = useContext(InjectContext)

  return (
    <Modal centered visible={state.previewModal} footer={false} onCancel={() => {setState((state: InjectStateType) => ({...state, previewModal: false}))}}>
      <iframe src={'data:text/html;base64,' + state.previewData} width="100%" className="!h-[650px]" title="Preview"/>
    </Modal>
  )
}