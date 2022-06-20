import { useContext, useState } from "react";
import { Form, Input, Button, notification, Card } from 'antd';
import { InjectContext } from './providers';
import { InjectStateType, ServerResponseType } from "../../common/DataType";
import { createInject, getInjectList } from "./services";
import FileInput from "../common/FileInput";

export default () => {
  const { state, setState } = useContext(InjectContext)

  const handleHTMLFile = (e: any) => {

    try {
      let HTMLFile = e.target.files[0];

      if (HTMLFile.type === "text/html") {

        let reader = new FileReader();

        reader.readAsDataURL(HTMLFile);

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

  const handlePNGFile = (e: any) => {
    try {
      let PNGFILE = e.target.files[0]

      if (PNGFILE.type === "image/png") {

        let reader = new FileReader();

        reader.readAsDataURL(PNGFILE);

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
              notification['warning']({
                  message: 'warning',
                  description: 'Image minimum size 50x50px, max size 500x500px',
              });
            }
          };
        };
        reader.onerror = function (evt) {
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
    }
  }

  const submit = () => {

    if (state.app == '' || state.html == '' || state.png == '') {
      notification.warn({
        message: 'Warn',
        description: 'Please input all items'
      })

      return 
    }

    createInject(state.app, state.html, state.png).then((res: ServerResponseType) => {
      notification['info']({
        message: res.type.toUpperCase(),
        description: res.message
      })


      setState((state: InjectStateType) => {
        return {
          ...state,
          app: ''
        }
      })
  

      getInjectList(state.table.page, state.table.perPage).then((res: any) => {
        setState((state: InjectStateType) => ({
          ...state,
          loading: false,
          app: '',
          html: '',
          png: '',
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
          autoComplete="off"
        >
          <Form.Item
            label="App Name"
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
          >
            <FileInput label="HTML File" onChange={handleHTMLFile}/>
          </Form.Item>

          <Form.Item
            label="PNG Icon File"
            name="png"
          >
            <FileInput label="PNG File" onChange={handlePNGFile}/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 14,
            }}
          >
            <Button type="primary" onClick={submit} htmlType="submit" ghost className="float-right">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>

  );
};
