export function keyValueTableToObject(table: any) {
  // table.rows -> [{ cells: [{ value }, { value }] }, ...]
  return Object.fromEntries(
    table.rows.map((row: any) => row.cells.map((cell: any) => cell.value)),
  );
}
