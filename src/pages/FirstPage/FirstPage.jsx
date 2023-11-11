import React from "react";
import schoolImg from "../../assets/images/school-software.png";
import { Button, Image, Typography } from "antd";
import s from "./FirstPage.module.css";
import { generatePath, useNavigate } from "react-router";
import { routes } from "../routes";

function FirstPage() {
  const navigate = useNavigate();
  return (
    <div className={s.box}>
      <div className={s.boxLeft}>
        <Typography.Title className={s.boxLeft_title} level={1}>
          School Management System
        </Typography.Title>
        <Image src={schoolImg} preview={false} width={600} />
        <Typography.Text className={s.boxLeft_description}>
          A great app for your school administration. This App is an online
          platform for all schools. A well thought concept that is specially
          designed to establish connectivity between school administration and
          teaching staff.
        </Typography.Text>
      </div>
      <div className={s.boxRight}>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(generatePath(routes.loginPage))}
        >
          Login to the system
        </Button>
        <Typography.Text className={s.boxRight_description}>
          If you want to register your school in the system, you should contant
          with system administration team
        </Typography.Text>
        <Typography.Text strong style={{ margin: "20px 0", fontSize: 20 }}>
          OR
        </Typography.Text>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(generatePath(routes.registerPage))}
        >
          Register on my own
        </Button>
      </div>
    </div>
  );
}

export default FirstPage;
