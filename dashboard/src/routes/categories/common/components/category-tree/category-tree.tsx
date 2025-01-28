import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";

import { SortableTree } from "../../../../../components/common/sortable-tree";
import { CategoryTreeItem } from "../../types";

type CategoryTreeProps = {
  value: CategoryTreeItem[];
  onChange: (
    value: {
      id: UniqueIdentifier;
      parentId: UniqueIdentifier | null;
      index: number;
    },
    items: CategoryTreeItem[]
  ) => void;
  renderValue: (item: CategoryTreeItem) => ReactNode;
  enableDrag?: boolean | ((item: CategoryTreeItem) => boolean);
  isLoading?: boolean;
};

export const CategoryTree = ({
  value,
  onChange,
  renderValue,
  enableDrag = true,
  isLoading = false,
}: CategoryTreeProps) => {
  if (isLoading) {
    return (
      <div className="txt-compact-small relative flex-1 overflow-y-auto">
        {Array.from({ length: 10 }).map((_, i) => (
          <CategoryLeafPlaceholder key={i} />
        ))}
      </div>
    );
  }

  console.log(value);

  const data = [
    {
      category_children: [],
      id: "pcat_01JJPRDM2R00PBGKSF20NPHEV6",
      name: "Shirts",
      parent_category_id: null,
      rank: 0,
    },
    {
      category_children: [],
      id: "pcat_01JJPRDM2V8Y5KGJMVKPKPCHF3",
      name: "Sweatshirts",
      parent_category_id: null,
      rank: 1,
    },
    {
      category_children: [],
      id: "pcat_01JJPRDM31Z57DF7SY0X100M0B",
      name: "Pants",
      parent_category_id: null,
      rank: 2,
    },
    {
      category_children: [],
      id: "pcat_01JJPRDM36CK4SQ9KN0RBCVG58",
      name: "Merch",
      parent_category_id: null,
      rank: 3,
    },
  ];

  return (
    <SortableTree
      items={value}
      childrenProp="category_children"
      collapsible
      enableDrag={enableDrag}
      onChange={onChange}
      renderValue={renderValue}
    />
  );
};

const CategoryLeafPlaceholder = () => {
  return (
    <div className="bg-ui-bg-base -mb-px flex h-12 animate-pulse items-center border-y px-6 py-2.5" />
  );
};
