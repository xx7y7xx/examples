import { Button, Space, DatePicker, version } from "antd";

const Application = () => {
  return (
    <div style={{ padding: "0 24px" }}>
      <h1>antd version: {version}</h1>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
    </div>
  );
};

export default Application;
