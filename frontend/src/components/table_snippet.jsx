import React, { useState } from "react";
import { useContext } from "react";
import { PatchAPI } from "../apis/patch_api";
import ButtonToggle from "./ui_elements/buttons/button_toggle";
import { SnippetContext } from "../utils/snippet_context";

function SnippetTable({ columns, data, rowClick }) {
  const { refreshSnippets } = useContext(SnippetContext);

  async function togglePublicStatus(snippet) {
    try {
      const updatedSnippet = { ...snippet, is_public: !snippet.is_public };
      const response = await PatchAPI("update-snippet/", updatedSnippet);
      if (response) {
        refreshSnippets();
      } else {
        console.error("Fehler beim Update");
      }
    } catch (error) {
      console.error("Fehler in togglePublicStatus:", error);
    }
  }

  return (
    <div className="">
      <table className="w-full rounded-2xl overflow-hidden border border-gray-500">
        <thead className="bg-white text-gray-700 uppercase text-sm border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Language</th>
            <th className="px-6 py-3 text-left">Created at</th>
            <th className="px-6 py-3 text-left">is public</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => rowClick && rowClick(row)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`} className="px-6 py-4">
                  {column === "is_public" ? (
                    <ButtonToggle
                      onBtnClick={(e) => {
                        e.stopPropagation();
                        togglePublicStatus(row);
                      }}
                      className={``}
                      isActive={row.is_public}
                    />
                  ) : (
                    row[column]
                  )}
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
