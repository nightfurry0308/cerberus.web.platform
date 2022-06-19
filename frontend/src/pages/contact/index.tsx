import { Card, Row, Col, Input, Button, Tooltip, message } from 'antd';

const { TextArea } = Input

const Contact = ({info, address}: {info: string, address: string}) => {
  const copy = (add: string) => {
    navigator.clipboard.writeText(add)

    message.info("Copied to clipboard")
  }

  return (
    <p className='text-base text-stone-500'>{info} <Tooltip title="Click to copy"><span onClick={() => {copy(address)}} className='text-stone-300 hover:text-stone-400 duration-300 cursor-pointer'>{address}</span></Tooltip></p>
  )
}

export default () => {

  return (
    <>
      <h2 className='text-center mb-4 text-4xl'>
        Contact Us
      </h2>
      <p className='m-auto w-[420px] text-center mb-4 text-stone-400'>If you have any questions, please contact to forum profile via PM. profile XSS.IS, TOR, profile EXPLOIT, TOR</p>
      <Row className='mb-8 !w-[1000px] !m-auto'>
        <Card size="small" className='!rounded-xl'>
          <h2 className='text-center text-xl mt-4 mb-8 text-stone-400'>Support Info</h2>
          <Row>
            <Col span={12} className='p-4'>
              <h2 className='mb-2 text-2xl text-red-500'>Or contact support via jabber</h2>
              <Contact info='' address='androidsupport@thesecure.biz'/>
              <h2 className='mb-2 text-2xl text-red-500'>Other contacts (not Cerberus team)</h2>
              <Contact info='Android Crypt - jabber' address='android_crypt@draugr.de'/>
              <Contact info='Android Crypt - jabber2' address='android_crypt@exploit.im'/>
              <Contact info='Inject developer - jabber' address='pw0ned@thesecure.biz'/>
              <Contact info='Inject developer - jabber2' address='pw0ned@thesecure.biz'/>
              <Contact info='Best server and proxy - jabber' address='nishebrod@abushost.ru'/>
              <Contact info='Best server and proxy - telegram' address='@ohyeahhellno'/>
              <Contact info='Google Play loaders - jabber' address='trump3d@thesecure.biz'/>
            </Col>
            <Col span={12} className='p-4'>
              <Input placeholder='Your Name' className='!p-4 !rounded-xl !mb-4' />
              <Input placeholder='Your Email' className='!p-4 !rounded-xl !mb-4' />
              <Input placeholder='Your Subject' className='!p-4 !rounded-xl !mb-4' />
              <TextArea rows={4} placeholder='Your Subject' className='!p-4 !rounded-xl !mb-4' />
              <Button type='primary' block className='!rounded-xl !mb-4' size='large' danger>Send Message</Button>
            </Col>
          </Row>
        </Card>
      </Row>
    </>)
};
