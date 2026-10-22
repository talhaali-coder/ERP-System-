
import { ClipboardList } from "lucide-react";

function DataTable({ columns, rows, emptyMessage = "No records found." }) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <ClipboardList size={28} />
        <strong>{emptyMessage}</strong>
        <span>Try changing your search or filters.</span>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || row.name || index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

