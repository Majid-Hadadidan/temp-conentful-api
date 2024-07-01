import { useEffect, useState } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: "qji7jyilfkxz",
  environment: "master",
  accessToken: "gAnkRi41pzZ3oGd6fy4X-tJJXznAU2Rjvp5ZqTtuIT0",
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setprojects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });

      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return {
          title,
          url,
          id,
          img,
        };
      });
      setprojects(projects);

      setLoading(false);
    } catch (error) {
      console.log("error");

      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
