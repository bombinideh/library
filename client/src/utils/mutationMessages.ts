import { TableTitle } from "@/types/table";

export const successMessage = (
  tableTitle: TableTitle,
  entityName: string,
  method: "POST" | "PATCH" | "DELETE",
) => {
  const { singular, gender } = tableTitle;
  const actions = {
    POST: "criad",
    PATCH: "editad",
    DELETE: "deletad",
  };
  const action = `${actions[method]}${gender.toLowerCase()}`;

  return `${gender} ${singular.toLowerCase()} "${entityName}" foi ${action}!`;
};
