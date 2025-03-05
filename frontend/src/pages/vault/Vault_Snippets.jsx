import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import SnippetTable from "../../components/table_snippet";
import TableBtnFilter from "../../components/ui_elements/buttons/button_filter_table";
import PopUpShowSnippet from "../../components/pop_up_show_snippet";
import { AuthContext } from "../../utils/auth_context";
import { SnippetContext } from "../../utils/snippet_context";
import { SearchContext } from "../../utils/searchbar_context";

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
  const { user } = useContext(AuthContext);
  const { userData, refreshSnippets } = useContext(SnippetContext);
  const { globSearchField } = useContext(SearchContext);

  const [snippets, setSnippets] = useState([]);
  const [allSnippets, setAllSnippets] = useState([]);
  const [keys, setKeys] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isOpenPopUpShowSnippet, setIsOpenPopUpShowSnippet] = useState(false);
  const [currentSnippetData, setCurrentSnippetData] = useState(null);

  /**
   * ! Fetch & Update Snippets when userData changes
   */
  useEffect(() => {
    if (userData && userData.snippets) {
      setSnippets(userData.snippets);
      setAllSnippets(userData.snippets);
      setKeys(userData.keys || []);
    }
  }, [userData]);

  /**
   * ! Filtered keys for table columns
   */
  const columns = keys.filter(
    (key) => !["id", "code", "description", "user_id"].includes(key)
  );
  /**
   * ! Filter with searchbar
   */
  useEffect(() => {
    if (!globSearchField) {
      setSnippets(allSnippets);
    } else {
      const filtered = allSnippets.filter((snippet) =>
        snippet.title?.toLowerCase().includes(globSearchField.toLowerCase())
      );
      setSnippets(filtered);
    }
  }, [globSearchField, allSnippets]);

  /**
   * ! Filter available languages
   */
  useEffect(() => {
    if (allSnippets.length > 0) {
      const uniqueLanguages = Array.from(
        new Set(allSnippets.map((snippet) => snippet.language))
      );
      setLanguages(uniqueLanguages);
    }
  }, [allSnippets]);

  const buttonData = languages.map((language) => ({
    title: language,
    icon: languageIcons[language] || null,
  }));

  /**
   * ! Handlers
   */
  function handleTableBtnFilter(language) {
    if (language) {
      const filteredSnippets = allSnippets.filter(
        (snippet) => snippet.language === language
      );
      setSnippets(filteredSnippets);
    } else {
      setSnippets(allSnippets);
    }
  }

  function handleRowClick(row) {
    setIsOpenPopUpShowSnippet(true);
    setCurrentSnippetData(row);
  }

  function handleClosePopUpShowSnippet() {
    setIsOpenPopUpShowSnippet(false);
  }

  return (
    <div>
      {isOpenPopUpShowSnippet && (
        <PopUpShowSnippet
          dataObj={currentSnippetData}
          onClick={handleClosePopUpShowSnippet}
          refreshSnippets={refreshSnippets}
        />
      )}

      {snippets.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <h1>Keine Einträge gefunden...</h1>
        </div>
      )}

      {snippets.length > 0 && (
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
      )}
    </div>
  );
};

export default Vault_Snippets;
