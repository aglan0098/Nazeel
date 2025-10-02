"use client";
import React from "react";

type Column = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode; //  for custom cell rendering
};

type Props = {
  columns: Column[];
  rows: any[];
};

export default function Table({ columns, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y-2 divide-gray-200 border border-gray-200 text-sm">
        <thead className="bg-second">
          <tr className="*:text-gray-700 divide-x divide-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-4 whitespace-nowrap text-center"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                لا توجد نتائج
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="*:text-gray-900 divide-x divide-gray-200 text-center"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key] ?? ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
