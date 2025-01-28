"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { GripVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";

interface SortableRowProps<TData> {
  row: Row<TData>;
}

export function SortableRow<TData>({ row }: SortableRowProps<TData>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <button {...listeners} className="cursor-grab">
          <GripVertical size={20} />
        </button>
      </TableCell>
      {row.getVisibleCells().map((cell: any) => (
        <TableCell key={cell.id}>{cell.renderValue()}</TableCell>
      ))}
    </TableRow>
  );
}
