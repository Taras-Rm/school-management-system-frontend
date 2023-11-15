import { Col, Divider, Drawer, Row } from "antd";
import React from "react";

const DescriptionItem = ({ title, content }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <p style={{ marginRight: 5 }}>{title}:</p>
    {content}
  </div>
);

function StudentInfoDrawer({ t, isOpen, onClose, student = {} }) {
  return (
    <Drawer
      open={isOpen}
      getContainer={false}
      onClose={onClose}
      width={600}
      closable={false}
    >
      <p style={{ fontSize: 20 }}>{t("formFields.profile")}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.name")}
            content={student.name}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.surname")}
            content={student.surname}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.dob")}
            content={
              student.dob === "0001-01-01T00:00:00Z"
                ? ""
                : student?.dob?.split("T")[0]
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.gender")}
            content={student.gender}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title={t("formFields.address")}
            content={student.address}
          />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>{t("formFields.contacts")}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.class")}
            content={
              student.class
                ? `${student.class.level}-${student.class.section}`
                : "not assigned"
            }
          />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>{t("formFields.contacts")}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.email")}
            content={student.email}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.phone")}
            content={student.phone}
          />
        </Col>
      </Row>
    </Drawer>
  );
}

export default StudentInfoDrawer;
