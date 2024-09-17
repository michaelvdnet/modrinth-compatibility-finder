import React from "react";
import ModInput from "./ModInput";
import { ModrinthProject } from "../Modrinth/project";
import ModList from "./ModList";
import { Divider, Sheet } from "@mui/joy";

type Props = {
  projects: ModrinthProject[];
  setProjects: React.Dispatch<React.SetStateAction<ModrinthProject[]>>;
};

function ModManagement({ projects, setProjects }: Props) {
  function onModAdd(modId?: string) {
    if (modId === null) return;
    if (projects.some((p) => p.id === modId)) return;
    fetch(`https://api.modrinth.com/v2/project/${modId}`)
      .then((res) => res.json())
      .then((res) => {
        setProjects([...projects, res]);
      });
  }

  return (
    <Sheet variant="outlined" sx={{ padding: "16px", marginTop: "16px" }}>
      <ModInput projects={projects} onModAdd={onModAdd} />
      <Divider />
      <ModList projects={projects} setProjects={setProjects} />
    </Sheet>
  );
}

export default ModManagement;
