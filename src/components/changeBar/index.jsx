import React from "react";
import { Button, Radio, Switch } from "antd";
import styles from "./changeBar.module.scss";

const ChangeBar = ({
  activeCalendar,
  setActiveCalendar,
  categories,
  selectCategorie,
  setSelectCategorie,
}) => {
  const onChange = (e) => {
    setSelectCategorie(e.target.value);
  };
  return (
    <div>
      <div>
        <div className={styles.activeC}>
          <label>Modificar calendario </label>
          <Switch onChange={() => setActiveCalendar(!activeCalendar)} />
        </div>
      </div>

      {activeCalendar && (
        <div className={styles.optionC}>
          <label>Seleccionar categoria </label>
          <Radio.Group
            onChange={onChange}
            value={selectCategorie}
            className={styles.bar}
          >
            {categories.map(({ name, id }) => (
              <Radio key={id} value={id}>
                {name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      )}
    </div>
  );
};

export default ChangeBar;
