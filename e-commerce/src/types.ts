import type { DraggableAttributes, UniqueIdentifier } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { MutableRefObject } from "react";

export type CategoryTreeItem = {
  id: string;
  name: string;
  parent_category_id: string | null;
  category_children: CategoryTreeItem[] | null;
  rank: number | null;
};

export interface TreeItem extends Record<string, unknown> {
  id: UniqueIdentifier;
}

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;

export type HandleProps = {
  attributes?: DraggableAttributes | undefined;
  listeners?: SyntheticListenerMap | undefined;
};
