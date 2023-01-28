import React, { useEffect, useState } from "react";
import { BookItemType, Category } from "../../types";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import AddToCategories from "../addToCategories/AddToCategories";

interface CategoriesProps {
  book: BookItemType;
}

const Categories: React.FC<CategoriesProps> = ({ book }) => {
  const { categories } = book;

  const [categoriesObj, setCategoriesObj] = useState<Category[]>([]);

  const allCategories = useTypedSelector((state) => state.books.categories);

  useEffect(() => {
    const categories = calculateCategories();
    setCategoriesObj(categories);
  }, [allCategories, categories]);

  // Kategorije kojima knjiga pripada
  const calculateCategories = () => {
    return allCategories.filter((category: Category) =>
      categories.includes(category.id)
    );
  };

  const renderCategories = categoriesObj.map((category: Category) => {
    return (
      <div className="p-1" key={category.id}>
        <i className="pi pi-circle-fill mr-1" style={{ fontSize: "0.5em" }}></i>
        {category.name}
      </div>
    );
  });

  return (
    <div className="mb-4">
      <p>Kategorije</p>
      <div>
        {categories.length !== 0 ? (
          renderCategories
        ) : (
          <em className="text-sm">Knjiga ne pripada nijednoj kategoriji</em>
        )}
      </div>
      &nbsp;
      <AddToCategories
        book={book}
        allCategories={allCategories}
        bookCategories={categoriesObj}
      />
    </div>
  );
};

export default Categories;
