import { Button } from "@wordpress/components";
import clsx from "clsx";

/* ADD ITEM */

export const addItemAtPosition = (
  array,
  item,
  index,
  position,
  setAttributes,
) => {
  const updatedArray = [...array];
  const newIndex = position === "before" ? index : index + 1;
  updatedArray.splice(newIndex, 0, item);
  setAttributes(updatedArray);
};

export const AddItemButton = ({
  onAdd,
  buttonText = "Add",
  className = "",
}) => (
  <Button
    variant="primary"
    onClick={onAdd}
    className={clsx(className, "w-fit")}
  >
    {buttonText}
  </Button>
);

/* REMOVE ITEM */

export const removeItem = (
  array,
  index,
  setAttributes,
) => {
  const updatedArray = array.filter((_, i) => i !== index);
  setAttributes(updatedArray);
};

export const RemoveItemButton = ({
  index,
  array,
  setAttributes,
  absolutePosition = true,
  buttonText = "X",
  className = "",
}) => (
  <Button
    variant="primary"
    className={clsx(
      absolutePosition ? "absolute top-0 right-0 z-[999]" : "",
      className,
      "w-fit",
    )}
    onClick={() => removeItem(array, index, setAttributes)}
  >
    {buttonText}
  </Button>
);

export const updateItemAttributes = (
  index,
  array,
  newAttributes,
) => {
  return array.map((item, idx) =>
    idx === index ? { ...item, ...newAttributes } : item,
  );
};
