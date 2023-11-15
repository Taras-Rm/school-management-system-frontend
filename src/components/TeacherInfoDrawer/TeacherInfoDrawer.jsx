import { Col, Divider, Drawer, Row } from "antd";
import React from "react";

const DescriptionItem = ({ title, content }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <p style={{ marginRight: 5 }}>{title}:</p>
    {content}
  </div>
);

function TeacherInfoDrawer({ t, isOpen, onClose, teacher = {} }) {
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
            content={teacher.name}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.surname")}
            content={teacher.surname}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.dob")}
            content={
              teacher.dob === "0001-01-01T00:00:00Z"
                ? ""
                : teacher?.dob?.split("T")[0]
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.gender")}
            content={teacher.gender}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title={t("formFields.address")}
            content={teacher.address}
          />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>{t("formFields.speciality")}</p>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title={t("formFields.degree")}
            content={teacher.degree}
          />
        </Col>
      </Row>
      <Divider />
      <p style={{ fontSize: 20 }}>{t("formFields.contacts")}</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.email")}
            content={teacher.email}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title={t("formFields.phone")}
            content={teacher.phone}
          />
        </Col>
      </Row>
    </Drawer>
  );
}

export default TeacherInfoDrawer;
