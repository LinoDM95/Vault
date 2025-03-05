import React from "react";


function SnippetTable({ columns, data, rowClick }) {
  /**
   * Generic table with row click function:
   * Table that needs to be fed with an array of objects.
   * In addition, the column names must be handed over via a list.
   *
   */
  return (
    <div className="">
      <table className="w-full shadow-lg rounded-2xl overflow-hidden border border-gray-500">
        <thead className="bg-white text-gray-700 uppercase text-sm border-b border-gray-300">
          <th className="px-6 py-3 text-left">Titel</th>
          <th className="px-6 py-3 text-left">Sprache</th>
          <th className="px-6 py-3 text-left">Erstellt am</th>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={function () {
                if (rowClick) {
                  rowClick(row);
                }
              }}
              className="hover:bg-gray-100 cursor-pointer"
            >
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`} className="px-6 py-4">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SnippetTable;
