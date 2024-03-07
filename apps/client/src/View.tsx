import type { TableProps } from "antd"
import { Card, Space, Table, Typography } from "antd"
import { addDays } from "date-fns"
import { useState } from "react"
import { UserData } from "./types"
import BarChart from "./BarChart"

const dummyUserData: UserData[] = [
  {
    id: '1',
    name: 'Eddie',
    gender: 'Male',
    submissions: [
      {
        durationSlept: 2,
        date: addDays(new Date(), 1).toDateString()
      },
      {
        durationSlept: 4,
        date: addDays(new Date(), 2).toDateString()
      },
      {
        durationSlept: 5,
        date: addDays(new Date(), 3).toDateString()
      },
    ],
  },
  {
    id: '2',
    name: 'Sam',
    gender: 'Male',
    submissions: [
      {
        durationSlept: 7,
        date: addDays(new Date(), 1).toDateString()
      }
    ] 
  },
  {
    id: '3',
    name: 'Jude',
    gender: 'Male',
    submissions: [
      {
        durationSlept: 11,
        date: addDays(new Date(), 1).toDateString()
      }
    ] 
  },
  {
    id: '4',
    name: 'Anthony',
    gender: 'Male',
    submissions: [
      {
        durationSlept: 9,
        date: addDays(new Date(), 1).toDateString()
      }
    ] 
  }
]

const finalDataSource = dummyUserData.map((data) => ({
  ...data,
  submissions: data.submissions.length
}))

type TableData = Pick<UserData, 'id' | 'name' | 'gender'> & {
  submissions: number
}

const columns: TableProps<TableData>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    align: 'center',
  },
  {
    title: 'No of Submissions',
    dataIndex: 'submissions',
    key: 'submissions',
    align: 'center',
  }
]

const { Title, Paragraph } = Typography

const View = () => {
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)
  const userData = dummyUserData.find(({ id }) => id === selectedKey)
  return (
    <Space direction="vertical" style={{ display: 'flex', width: '100%'}}>
      <Title>User Records</Title>
      <Table 
        dataSource={finalDataSource} 
        columns={columns}
        rowSelection={{
          type: 'radio',
          onChange: ([key]) => {
            setSelectedKey(key)
          }
        }}
        rowKey={(record) => record.id}
      />
      <Card>
        {
          userData ? (
            <>
              <Space direction="vertical" style={{ display: 'flex', width: '100%'}}>
                <Title>{`${userData.name}'s Sleep Pattern`}</Title>
                <BarChart userData={userData}/>
              </Space>
            </>
          ) :   
            <>
              <Space direction="vertical" style={{ display: 'flex', width: '100%'}}>
                <Title level={3} style={{ textAlign: 'center'}}>
                  No Record Selected
                </Title>
                <Paragraph style={{ textAlign: 'center' }}>Please select a table row to display bar chart...</Paragraph>
              </Space>
            </>
        } 
      </Card>
    </Space>
  )
}

export default View