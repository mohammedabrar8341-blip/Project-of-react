import { useEffect, useState } from "react";

const ImportAllMenus = () => {
  const [status, setStatus] = useState("Starting...");
  const [results, setResults] = useState([]);

  useEffect(() => {
    importAllMenus();
  }, []);

  const importAllMenus = async () => {
    try {
      // Get all 17 restaurants from your backend
      const restaurantResponse = await fetch(
        "http://localhost:8080/api/restaurants"
      );

      const restaurants = await restaurantResponse.json();

      console.log("Restaurants:", restaurants);

      const imported = [];

      for (const restaurant of restaurants) {
        try {
          setStatus(`Importing ${restaurant.resName}...`);

          console.log(
            `Fetching menu for ${restaurant.resName} (${restaurant.id})`
          );

          // Read the menu already stored in MongoDB.
          const response = await fetch(
            `http://localhost:8080/api/menu/${restaurant.id}`
          );

          if (!response.ok) {
            throw new Error(`Menu error: ${response.status}`);
          }

          const menu = await response.json();

          console.log(
            `${restaurant.resName}:`,
            menu
          );

          imported.push({
            restaurant: restaurant.resName,
            count: menu.length || 0,
            status: "Menu loaded from MongoDB",
          });

          setResults([...imported]);

          // Small delay between requests
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(
            `Failed: ${restaurant.resName}`,
            error
          );

          imported.push({
            restaurant: restaurant.resName,
            count: 0,
            status: error.message,
          });

          setResults([...imported]);
        }
      }

      setStatus("All restaurants processed!");
    } catch (error) {
      console.error("Import failed:", error);
      setStatus("Import failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Menu Import</h1>

      <h2>{status}</h2>

      {results.map((result, index) => (
        <div key={index}>
          <strong>{result.restaurant}</strong>

          {" - "}

          {result.count > 0
            ? `${result.count} items stored`
            : result.status}
        </div>
      ))}
    </div>
  );
};

export default ImportAllMenus;