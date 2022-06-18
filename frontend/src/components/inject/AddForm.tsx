import { useContext } from "react";
import { Form, Input, Button, Upload, UploadProps, notification, Card } from 'antd';
import { InjectContext } from './providers';
import { InjectStateType, ServerResponseType } from "../../common/DataType";
import { createInject, getInjectList } from "./services";

export default () => {
  const { state, setState } = useContext(InjectContext)

  const PNGProps: UploadProps = {
    beforeUpload: file => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        notification['error']({
          message: 'ERROR',
          description: `${file.name} is not a png file.`,
        });
      }

      return isPNG || Upload.LIST_IGNORE;
    }
  };

  const HTMLProps: UploadProps = {
    beforeUpload: file => {
      const isHTML = file.type === 'text/html';
      if (!isHTML) {
        notification['error']({
          message: 'ERROR',
          description: `${file.name} is not a HTML file.`,
        });

      }
      return isHTML || Upload.LIST_IGNORE;
    }
  }

  const handleHTMLFile = (file: any) => {
    try {
      let HTMLFile = file.file;

      if (HTMLFile.type === "text/html") {

        let reader = new FileReader();

        reader.readAsDataURL(HTMLFile.originFileObj);

        reader.onload = function (evt: any) {
          setState((state: InjectStateType) => ({
            ...state,
            html: evt.target.result.split(',')[1]
          }))
        };

        reader.onerror = function (evt) {
        };
      }
      else {
        notification['warning']({
          message: 'warning',
          description: 'Please select only HTML files',
        });
      }
    }
    catch (err: any) {
    }
  }

  const handlePNGFile = (file: any) => {
    try {
      let PNGFILE = file.file;

      if (PNGFILE.type === "image/png") {

        let reader = new FileReader();

        reader.readAsDataURL(PNGFILE.originFileObj);

        reader.onload = function (evt: any) {
          let image = new Image();

          image.src = evt.target.result;

          image.onload = function () {
            if (image.width >= 50 && image.height >= 50 && image.width <= 500 && image.height <= 500) {

              setState((state: InjectStateType) => ({
                ...state,
                png: evt.target.result.split(',')[1]
              }))
            }
            else {
              // notification['warning']({
              //     message: 'warning',
              //     description: 'Image minimum size 50x50px, max size 500x500px',
              // });
            }
          };
        };
        reader.onerror = function (evt) {
        };
      }
      else {
      }
    }
    catch (err: any) {
    }
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const submit = () => {
    createInject(state.app, state.html, state.png).then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })

      getInjectList(state.table.page, state.table.perPage).then((res: any) => {
        setState((state: InjectStateType) => ({
          ...state,
          loading: false,
          table: {
            ...state.table,
            rows: res.rows,
            count: res.count
          }
        }))
      })

    })
  }

  return (
    <>
      <Card size="small" className='!rounded-xl hover:!shadow-red-600 shadow-md duration-300'>
        <h2 className='text-center text-xl mt-4 mb-8 text-stone-400'>Add New Inject</h2>
        <Form
          name="inject"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          initialValues={{
            remember: true,
          }}
          onFinish={submit}
          autoComplete="off"
        >
          <Form.Item
            label="App Name"
            name="app"
            rules={[
              {
                required: true,
                message: 'Please input app name.',
              },
            ]}
          >
            <Input placeholder='Enter android app name.' value={state.app} onChange={(e: any) => setState((state: InjectStateType) => ({ ...state, app: e.target.value }))} />
          </Form.Item>

          <Form.Item
            label="HTML File"
            name="html"
            rules={[
              {
                required: true,
                message: 'Please input HTML file.',
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload onChange={handleHTMLFile} maxCount={1} {...HTMLProps}>
              <Button>HTML File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="PNG Icon File"
            name="png"
            rules={[
              {
                required: true,
                message: 'Please input PNG file.',
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...PNGProps} onChange={handlePNGFile} maxCount={1}>
              <Button>PNG File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 14,
            }}
          >
            <Button type="primary" htmlType="submit" ghost className="float-right">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>

  );
};
