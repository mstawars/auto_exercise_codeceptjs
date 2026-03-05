export function keyValueTableToObject(table: any) {
  return Object.fromEntries(
    table.rows.map((row: any) => row.cells.map((cell: any) => cell.value)),
  );
}
