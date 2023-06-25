import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";

const AvailableMeals = function () {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState();
  useEffect(() => {
    const fetchMeals = async function () {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-2ee63-default-rtdb.firebaseio.com/DUMMY_MEALS.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMeals = [];

      Object.entries(data).forEach((entry) => {
        const [key, meal] = entry;
        loadedMeals.push({
          id: key,
          price: meal.price,
          description: meal.description,
          name: meal.name,
        });
      });

      setMeals(loadedMeals);
      setIsLoading(false);
      setHasError("");
    };

    const tryLoad = async function () {
      try {
        await fetchMeals();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setHasError(error.message);
      }
    };

    tryLoad();
  }, []);

  console.log(meals);
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        meal={meal}
        price={meal.price}
        name={meal.name}
      ></MealItem>
    );
  });

  console.log(isLoading, hasError);
  if (isLoading) {
    return <p> Loading...</p>;
  }

  if (hasError !== "") {
    return <p>{hasError}</p>;
  }
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
