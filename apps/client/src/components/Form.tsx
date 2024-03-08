import { Button, Card, DatePicker, Form, Input, Select, Typography, notification } from 'antd'
import { useState } from 'react'
import saveUser from '../hooks/saveUser'

type FieldValues = {
  name: string
  gender: 'male' | 'female' | 'other'
  duration: number
  date: Date
}

const { Title } = Typography

const UserForm = (): JSX.Element => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setIsLoading] = useState<boolean>(false)

  const showSuccessToast = (type: 'success' | 'error') => {
    const message = type === 'success' ? 'User Record Saved' : 'Failure to save new record!'
    api[type]({
      message
    })
  }
  return (
    <Card style={{ maxWidth: 600 }}>
      {contextHolder}
      <Title>Enter User Details</Title>
      <Form    
        name='basic'
        layout='vertical'
        autoComplete='off'
        onFinish={async (values) => {
          setIsLoading(true)
          const { error } = await saveUser({
            name: values.name,
            gender: values.gender,
            sleepPattern: {
              duration: Number(values.duration),
              date: new Date(values.date).toISOString()
            }
          })
          const type = error === undefined ? 'success' : 'error'
          showSuccessToast(type) 
          setIsLoading(false)
        }}
      >
        <Form.Item<FieldValues> label='Username' name='name' rules={[{ required: true, message: 'Please enter a username!', type: 'string'}]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldValues> name='gender' label='Gender' rules={[{ required: true, message: 'Please provide gender!' }]}>
          <Select>
            <Select.Option value='male'>Male</Select.Option>
            <Select.Option value='female'>Female</Select.Option>
            <Select.Option value='other'>Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldValues> 
          label='Duration of Sleep (hours)'
          name='duration'
          rules={[
            { required: true, message: 'Please provide duration of sleep!' },
            {
              validator(_, value) {
                if (!isNaN(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The duration of sleep must be a numerical value!'));
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldValues> name='date' label="Date Recorded" rules={[{ required: true, message: 'Please provide date!' }]}>
          <DatePicker />
         </Form.Item>
        <Form.Item labelCol={{ offset: 12 }}>
          <Button type='primary' loading={loading} htmlType='submit'>
            Save User Record
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default UserForm