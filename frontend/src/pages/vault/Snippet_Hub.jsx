import React, {  } from "react";
import { motion } from "framer-motion"; 




const Snippet_Hub = () => {

  return (
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-black flex items-center justify-center text-9xl">Area wehre the user can add user shared snippets</h1>
        </motion.div>
  );
};

export default Snippet_Hub;
