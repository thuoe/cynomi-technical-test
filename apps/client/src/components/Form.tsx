import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Typography,
  notification,
} from 'antd'
import useSaveUser from '../hooks/saveUser'
import { User } from '../types'
import MyDatePicker from './DatePicker'

type FieldValues = {
  name: string
  gender: 'male' | 'female' | 'other'
  duration: number
  date: Date
}

const { Title } = Typography

const UserForm = (): JSX.Element => {
  const [api, contextHolder] = notification.useNotification()
  const saveUser = useSaveUser<User>(
    () => {
      showToast('success')
    },
    () => {
      showToast('error')
    },
  )

  const showToast = (type: 'success' | 'error') => {
    const message =
      type === 'success' ? 'User Record Saved' : 'Failure to save new record!'
    api[type]({
      message,
    })
  }

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        margin: '0 auto',
        maxWidth: 600,
      }}
    >
      {contextHolder}
      <Title>Enter User Details</Title>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => {
          saveUser.mutate({
            name: values.name,
            gender: values.gender,
            sleepPattern: {
              duration: Number(values.duration),
              date: new Date(values.date).toISOString(),
            },
          })
        }}
      >
        <Form.Item<FieldValues>
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a username!',
              type: 'string',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldValues>
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please provide gender!' }]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldValues>
          label="Duration of Sleep (hours)"
          name="duration"
          rules={[
            { required: true, message: 'Please provide duration of sleep!' },
            {
              validator(_, value) {
                if (!isNaN(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The duration of sleep must be a numerical value!'),
                )
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldValues>
          name="date"
          label="Date Recorded"
          rules={[{ required: true, message: 'Please provide date!' }]}
        >
          <MyDatePicker maxDate={new Date()} />
        </Form.Item>
        <Form.Item labelCol={{ offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Save User Record
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default UserForm
