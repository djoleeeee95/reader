import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./addToCategories.css";
import { InputText } from "primereact/inputtext";
import { BookItemType, Category } from "../../types";
import { useActions } from "../../hooks/use-actions";

interface AddToCategoriesProps {
  book: BookItemType;
  allCategories: Category[];
  bookCategories: Category[];
}

const AddToCategories: React.FC<AddToCategoriesProps> = ({
  book,
  allCategories,
  bookCategories,
}) => {
  const { key } = book;

  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [options, setOptions] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "",
  });

  const { addCategory, addToCategory } = useActions();

  useEffect(() => {
    const options = calculateOptions();
    setOptions(options);
  }, [allCategories, bookCategories]);

  // funkcija vraca kategorije u kojima se odabrana knjiga ne nalazi,
  // kojima ju je moguce dodati
  const calculateOptions = () => {
    return allCategories.filter(
      (category) => !bookCategories.includes(category)
    );
  };

  const clickAddToCategory = () => {
    addToCategory(selectedCategory?.id, key);
    setSelectedCategory({ id: 0, name: "" });
  };

  const clickAddCategory = () => {
    const id = randomID();
    addCategory({ id, name: categoryName });
    addToCategory(id, key);
    setAddClicked(false);
    setCategoryName("");
  };

  const cancelAddCategory = () => {
    setCategoryName("");
    setAddClicked(false);
  };

  // generator nasumicnih identifikatora za kategorije
  const randomID = () => {
    return Math.round(Math.random() * 1000);
  };

  return (
    <div>
      <div className="mb-1">Dodaj knjigu u kategoriju</div>
      <div className="categories">
        <Dropdown
          value={selectedCategory}
          options={options}
          optionLabel="name"
          disabled={addClicked}
          placeholder="Odaberite kategoriju"
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
        &nbsp;
        <Button
          className="plus-button"
          disabled={addClicked}
          icon="pi pi-plus"
          tooltipOptions={{ position: "top" }}
          onClick={() => setAddClicked(true)}
        />
      </div>
      &nbsp;
      <div>
        {addClicked === false ? (
          <Button
            label="Potvrdi"
            disabled={selectedCategory.id === 0 || addClicked}
            onClick={clickAddToCategory}
          />
        ) : (
          <div>
            <InputText
              className="category-input"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Unesite naziv kategorje"
            />
            <div className="buttons">
              <Button
                className="mr-1"
                label="Potvrdi"
                disabled={categoryName === ""}
                onClick={clickAddCategory}
              />
              <Button label="Otkazi" onClick={cancelAddCategory} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCategories;
