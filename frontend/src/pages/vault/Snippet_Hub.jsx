import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardSnippetShowCase from "../../components/ui_elements/cards/card_snippet_showcase";
import UserLogo from "../../components/user_logo";
import { getData } from "../../apis/get_api";

const Snippet_Hub = () => {
  const [publicData, setPublicData] = useState([]);

  const fetchSnippets = async () => {
    try {
      const data = await getData("get-all-snippets");
      console.log(data)
      if (data) {
        setPublicData(data.snippets);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Snippets:", error);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <div className="flex flex-col text-primary">
        <h1 className="text-6xl font-bold">User Snippet Collection</h1>
        <h2 className="text-2xl">Explore and share code snippets.</h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap gap-3 items-center justify-center "
      >
        {publicData.map((snippet) => (
          <CardSnippetShowCase
            key={snippet.id}
            user={<UserLogo user={snippet.user__username} className="w-20 h-20 text-6xl"/>}
            title={snippet.title}
            description={snippet.description}
            language={snippet.language}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Snippet_Hub;
