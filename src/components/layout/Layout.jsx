// Importaciones necesarias
import React, { useState } from "react";
import {
  ColorPicker,
  FloatButton,
  Input,
  Layout,
  Menu,
  Modal,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import { newCategorie, deleteCategorie } from "../../store/slices/categories";
import styles from "./layoutCalendar.module.scss"; // Importa el archivo SCSS

const { Header, Content, Sider } = Layout;

const LayoutCalendar = ({ children }) => {
  const { categories } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#ffffff");

  const handleOk = () => {
    console.log(categoryColor)
    dispatch(
      newCategorie({
        id: categoryName,
        name: categoryName,
        color: categoryColor,
      })
    );
    setCategoryName("");
    setCategoryColor("#ffffff");
    setOpenModal(false);
  };

  const handleCancel = () => {
    setCategoryName("");
    setCategoryColor("#ffffff");
    setOpenModal(false);
  };

  const delte = (id) => {
    dispatch(deleteCategorie({ id: id }));
  };

  const items = categories.map((categorie) => ({
    key: categorie.id,
    label: (
      <div className={styles.menuItem}>
        <h2 style={{ color: categorie.color }}>{categorie.name}</h2>
        <Popconfirm
          title="Borrar Categoría"
          onConfirm={() => delte(categorie.id)}
          okText="Sí"
          cancelText="No"
        >
          <DeleteOutlined className={styles.menuItemIcon} />
        </Popconfirm>
      </div>
    ),
  }));

  return (
    <Layout className={styles.xx}>
      <Header className={styles.header}>
        <div className="demo-logo" />
        <h1 style={{ color: "white" }}>2024</h1>
      </Header>
      <Content className={styles.content}>
        <Layout className={styles.innerLayout}>
          <Sider className={styles.sider}>
            <Menu
              mode="inline"
              style={{ height: "100%" }}
              items={items}
            />
          </Sider>
          <Content className={styles.innerContent}>{children}</Content>
        </Layout>
      </Content>

      <FloatButton
        icon={<FileTextOutlined />}
        description="Agregar categoria"
        onClick={() => setOpenModal(true)}
        className={styles.floatButton}
      />
      <Modal
        title="Agregar Categoría"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Nombre de la categoría"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className={styles.modalInput}
        />
        <div>
          <label className={styles.colorLabel}>Selecciona el color:</label>
          <ColorPicker
            value={categoryColor}
            onChange={(color) => setCategoryColor(color.toHexString())}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default LayoutCalendar;
