import { Button } from "@wordpress/components";
import clsx from "clsx";

/* ADD ITEM */
type AddItemButtonProps = {
  onAdd: () => void;
  buttonText?: string;
  className?: string;
};

export const addItemAtPosition = <T,>(
  array: T[],
  item: T,
  index: number,
  position: "before" | "after",
  setAttributes: (updatedArray: T[]) => void,
): void => {
  const updatedArray = [...array];
  const newIndex = position === "before" ? index : index + 1;
  updatedArray.splice(newIndex, 0, item);
  setAttributes(updatedArray);
};

export const AddItemButton = ({
  onAdd,
  buttonText = "Add",
  className = "",
}: AddItemButtonProps) => (
  <Button
    variant="primary"
    onClick={onAdd}
    className={clsx(className, "w-fit")}
  >
    {buttonText}
  </Button>
);

/* REMOVE ITEM */
type RemoveButtonProps<T> = {
  index: number;
  array: T[];
  absolutePosition?: boolean;
  setAttributes: (updatedArray: T[]) => void;
  buttonText?: string;
  className?: string;
};

export const removeItem = <T,>(
  array: T[],
  index: number,
  setAttributes,
): void => {
  const updatedArray = array.filter((_, i) => i !== index);
  setAttributes(updatedArray);
};

export const RemoveItemButton = <T,>({
  index,
  array,
  setAttributes,
  absolutePosition = true,
  buttonText = "X",
  className = "",
}: RemoveButtonProps<T>) => (
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

export const updateItemAttributes = <T,>(
  index: number,
  array: T[],
  newAttributes: Partial<T>,
): T[] => {
  return array.map((item, idx) =>
    idx === index ? { ...item, ...newAttributes } : item,
  );
};
