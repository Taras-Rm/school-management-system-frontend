import { Col, Divider, Drawer, Row } from "antd";
import React from "react";

const DescriptionItem = ({ title, content }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <p style={{ marginRight: 5 }}>{title}:</p>
    {content}
  </div>
);

function StudentInfoDrawer({ isOpen, onClose, student = {} }) {
  return (
    <Drawer
      open={isOpen}
      getContainer={false}
      onClose={onClose}
      width={600}
      closable={false}
    >
      <p style={{ fontSize: 20 }}>Profile</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Name" content={student.name} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Surname" content={student.surname} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Birthday"
            content={
              student.dob === "0001-01-01T00:00:00Z"
                ? ""
                : student?.dob?.split("T")[0]
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Gender" content={student.gender} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Address" content={student.address} />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Class"
            content={
              student.class
                ? `${student.class.level}-${student.class.section}`
                : "not assigned"
            }
          />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Email" content={student.email} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Phone Number" content={student.phone} />
        </Col>
      </Row>
    </Drawer>
  );
}

export default StudentInfoDrawer;
