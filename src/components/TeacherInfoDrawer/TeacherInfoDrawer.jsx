import { Col, Divider, Drawer, Row } from "antd";
import React from "react";

const DescriptionItem = ({ title, content }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <p style={{ marginRight: 5 }}>{title}:</p>
    {content}
  </div>
);

function TeacherInfoDrawer({ isOpen, onClose, teacher = {} }) {
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
          <DescriptionItem
            title="Name"
            content={`${teacher.name} ${teacher.surname}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Gender" content={teacher.gender} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Address" content={teacher.address} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Birthday"
            content={
              teacher.dob === "0001-01-01T00:00:00Z"
                ? ""
                : teacher?.dob?.split("T")[0]
            }
          />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>Speciality</p>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Degree" content={teacher.degree} />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Email" content={teacher.email} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Phone Number" content={teacher.phone} />
        </Col>
      </Row>
    </Drawer>
  );
}

export default TeacherInfoDrawer;
