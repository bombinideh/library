import { Column } from "@/components/Elements/Table";

export function getManipulableTableColumns<T extends object>(columns: Column<T>[]) {
  const ignoreKeys = ["id", "created_at", "_name"];

  return columns.filter(({ key, notManipulable }) => {
    return (
      !notManipulable &&
      ignoreKeys.every(ignoreKey => !(key as string).includes(ignoreKey))
    );
  });
}
