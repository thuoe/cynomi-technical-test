import type { TableProps } from "antd";
import { Card, Space, Table, Typography } from "antd";
import { useState } from "react";
import { User } from "../types";
import BarChart from "./BarChart";
import useFetchUsers from "../hooks/fetchUsers";

type TableData = Pick<User, "id" | "name" | "gender"> & {
  submissions: number;
};

const columns: TableProps<TableData>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
  },
  {
    title: "No of Submissions",
    dataIndex: "submissions",
    key: "submissions",
    align: "center",
  },
];

const { Title, Paragraph } = Typography;

const View = (): JSX.Element => {
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);
  const { data, isPending } = useFetchUsers<User[]>();

  const finalDataSource =
    data?.map((data) => ({
      ...data,
      submissions: data.sleepPatterns.length,
    })) ?? [];

  const user = data?.find(({ id }) => id === selectedKey);

  return (
    <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
      <Title>User Records</Title>
      <Table
        loading={isPending}
        dataSource={finalDataSource}
        columns={columns}
        rowSelection={{
          type: "radio",
          onChange: ([key]) => {
            setSelectedKey(key);
          },
        }}
        pagination={{
          defaultPageSize: 5,
        }}
        rowKey={(record) => record.id}
      />
      <Card>
        {user ? (
          <>
            <Space
              direction="vertical"
              style={{ display: "flex", width: "100%" }}
            >
              <Title>{`${user.name}'s Sleep Pattern`}</Title>
              <BarChart userData={user} />
            </Space>
          </>
        ) : (
          <>
            <Space
              direction="vertical"
              style={{ display: "flex", width: "100%" }}
            >
              <Title level={3} style={{ textAlign: "center" }}>
                No Record Selected
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                Please select a table row to display bar chart...
              </Paragraph>
            </Space>
          </>
        )}
      </Card>
    </Space>
  );
};

export default View;
