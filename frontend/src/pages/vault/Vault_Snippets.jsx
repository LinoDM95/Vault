import React from "react";
import { useEffect, useState } from "react";
import SnippetTable from "../../components/table_snippet";
import TableBtnFilter from "../../components/ui_elements/button_filter_table";
import ButtonCreate from "../../components/ui_elements/button_create";


/**
 * !filtered language icons
 */
const importIcons = import.meta.glob("/src/img/*.{svg,png,jpg}", {
  eager: true,
});
const languageIcons = Object.fromEntries(
  Object.entries(importIcons).map(([path, module]) => {
    const name = path
      .split("/")
      .pop()
      .replace(/\.(svg|png|jpg)$/, "");
    return [name, module.default];
  })
);

const Vault_Snippets = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const [allSnippets, setAllSnippets] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [keys, setKeys] = useState([]);
  const [languages, setLanguages] = useState([]);

  /**
   * !Fetch
   */
  useEffect(() => {
    async function fetchSnippets() {
      /**
       * Get snippet data
       */
      try {
        const response = await fetch(`${API_URL}/get-all-snippets/`);
        if (response.ok) {
          const data = await response.json();
          setSnippets(data.snippets);
          setAllSnippets(data.snippets);
          setKeys(data.keys);
        }
      } catch (error) {
        console.error("fetch snippets went wrong", error);
      };
    }
    fetchSnippets();
  }, []);


  /**
   * !Functions where data get filtered
   */
  function filteredKeys(keys) {
    /**
     * Filter keys for the columns array
     */
    return keys.filter((word) => !["code", "description"].includes(word));
  };
  const columns = filteredKeys(keys);

  function filterLanguages(snippets) {
    /**
     * combine languages with icons
     * Used to display filter section
     */
    const languages = Array.from(
      new Set(snippets.map((snippet) => snippet.language))
    );
    return languages;
  };

  useEffect(() => {
    if (allSnippets.length > 0) {
      setLanguages(filterLanguages(allSnippets));
    }
  }, [snippets]);

  const buttonData = languages.map((language) => ({
    title: language,
    icon: languageIcons[language] || null,
  }));

  /**
   * !Handlers
   */
  function handleTableBtnFilter(language) {
    /**
     * Handler for the filter section
     */
    if (language) {
      const filteredSnippets = allSnippets.filter(
        (snippet) => snippet.language === language
      );
      setSnippets(filteredSnippets);
    } else {
      setSnippets(allSnippets);
    }
  };

  function handleRowClick(row) {
    /**
     * handler for the code snippet pop up
     */
    // TODO: Logic to open the Snippet where the user can copy it
    alert(`${row.id}`);
  };

  function handleCodeEditor (newCode) {
    console.log(newCode);
  }

  return (
    <div>

      <div>
        <TableBtnFilter
          buttons={buttonData}
          onBtnClick={handleTableBtnFilter}
        />
        <SnippetTable
          columns={columns}
          data={snippets}
          rowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Vault_Snippets;
