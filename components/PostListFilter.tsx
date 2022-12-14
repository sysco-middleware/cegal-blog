import { useEffect, useState, useCallback, ChangeEvent } from "react";
import {
  SelectMultiple,
  SelectMultipleProps,
  TextField,
} from "@cegal/ui-components";
import { BlogPost } from "shared/types";

type PostFilterProps = {
  categories?: BlogPost["categories"];
  onFilterChange: (value: FilterValue) => void;
  filterValue: FilterValue;
};

export type FilterValue = {
  search: string;
  categories: SelectMultipleProps["options"];
};

const Select = (props: SelectMultipleProps) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    if (window) {
      setShowComponent(true);
    }
  }, []);

  return showComponent ? <SelectMultiple {...props} /> : null;
};

export const PostListFilter = ({
  categories,
  onFilterChange,
  filterValue,
}: PostFilterProps) => {
  const categoriesOptions = categories?.map((category) => ({
    label: category.title,
    value: category.id,
  }));

  const handelCategoriesChange = (value: SelectMultipleProps["options"]) => {
    onFilterChange({ search: filterValue.search, categories: value });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      search: e.target.value,
      categories: filterValue.categories,
    });
  };

  return (
    <div className="mb-4 flex  items-center justify-end gap-2">
      {categories && (
        <Select
          hideLabel
          label="Tag select"
          multiple
          onChange={handelCategoriesChange}
          options={categoriesOptions}
          size="small"
          placeholder="Select tags"
          style={{ height: 38 }}
          value={filterValue.categories}
        />
      )}

      <TextField
        size="small"
        placeholder="Search"
        style={{ height: 38 }}
        onChange={handleSearch}
        value={filterValue.search}
      />
    </div>
  );
};
