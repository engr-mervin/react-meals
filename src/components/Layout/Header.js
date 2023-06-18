import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = function (props) {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onClick}></HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food"></img>
      </div>
    </>
  );
};

export default Header;
