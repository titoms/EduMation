// DataTable.tsx
import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ColumnConfig {
  key: string; // Data key
  header: string; // Column header text
  render?: (row: any) => JSX.Element; // Custom renderer function
}

interface DataTableProps {
  data: any[];
  columns: ColumnConfig[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
          {(onEdit || onDelete) && (
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
            {(onEdit || onDelete) && (
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex gap-4">
                  {onEdit && (
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(row)}
                    />
                  )}
                  {onDelete && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(row)}
                    />
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
