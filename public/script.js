// 1     //IndexDB File
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

// Open or create a database
const request = indexedDB.open("myDatabase", 1);

request.onerror = function (event) {
  console.error("An error occurred with IndexedDB");
  console.error(event);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an object store named 'recipes'
  const recipesStore = db.createObjectStore("recipes", {
    keyPath: "id",
    autoIncrement: true,
  });

  //3
  recipesStore.createIndex("instructions", "instruction", { unique: false });

  // 4
  recipesStore.createIndex("ingredients", "ingredient", {
    unique: false,
  });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  const transaction = db.transaction(["recipes"], "readwrite");
  const recipesStore = transaction.objectStore("recipes");
  const instructionIndex = recipesStore.index("instructions");
  const ingredientIndex = recipesStore.index("ingredients");

  const store = recipesStore.put({
    id: 1,
    instruction:
      "Crispy Baked Green Bean Fries could be just the gluten free, dairy free, paleolithic, and lacto ovo vegetarian recipe you've been looking for. This recipe makes 2 servings with 677 calories, 32g of protein, and 49g of fat each. For $3.3 per serving, this recipe covers 29% of your daily requirements of vitamins and minerals",
    ingredient:
      "1 1/2 cups almond meal 1 Tbsp black pepper 1 tsp cayenne pepper 3 eggs (lightly beaten) 1lb fresh green beans (snapped) 1 Tbsp garlic powder 1 Tbsp onion powder",
  });
  recipesStore.put({
    id: 2,
    instruction:
      "Yogurt Parfait could be just the lacto ovo vegetarian recipe you've been looking for. For $2.82 per serving, this recipe covers 23% of your daily requirements of vitamins and minerals. One portion of this dish contains roughly 22g of protein, 12g of fat, and a total of 554 calories.",
    ingredient:
      "1 cup of cereal or granola 1 cup of fresh fruit Fresh mint 2 tablespoons of honey 2 cups of plain non fat yogurt",
  });
  recipesStore.put({
    id: 3,
    instruction:
      "If you want to add more gluten free, lacto ovo vegetarian, primal, and ketogenic recipes to your collection, Keto Cheesecake might be a recipe you should try. This recipe serves 16 and costs $1.12 per serving. One serving contains 368 calories, 8g of protein, and 35g of fat. 1 person found this recipe to be yummy and satisfying",
    ingredient:
      "2 cups sliced almonds 1/4cup stevia divided ½ teaspoon ground cinnamon 5 tablespoons salted butter melted 32 ounces cream cheese 3 large eggs 2 teaspoonsvanilla extract 16 ounces sour cream",
  });

  recipesStore.put({
    id: 4,
    instruction:
      "Brownie Cheesecake is an American dessert. For $1.11 per serving, this recipe covers 5% of your daily requirements of vitamins and minerals. One portion of this dish contains roughly 6g of protein, 37g of fat, and a total of 530 calorie",
    ingredient:
      "1-1 1/2 cups dry chocolate cake or cookie crumbs, depending on how much crust you like 2 pounds cream cheese, at room temperature 2 eggs 1 1/2 cups granulated sugar@16 1/2- 3/4 inch brownies A pinch of salt 1/2 cup sugar (add another 1/4 to 1/2 cup if you like it sweet) 1/2 cup unsalted butter 1 teaspoon vanilla",
  });

  //4
  const idQuery = recipesStore.get(4);
  const instructionQuery = instructionIndex.getAll("instruction");
  const ingredientQuery = ingredientIndex.get("ingredient");

  // 5
  idQuery.onsuccess = function () {
    console.log("idQuery", idQuery.result);
  };
  instructionQuery.onsuccess = function () {
    console.log("instruction", instructionQuery.result);
  };
  ingredientQuery.onsuccess = function () {
    console.log("ingredient", ingredientQuery.result);
  };

  // 6
  transaction.oncomplete = function () {
    db.close();
  };
};
