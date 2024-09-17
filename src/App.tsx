import React, { useState } from "react";
import "./App.css";
import ModloadVersionGrid from "./Components/ModloaderVersionGrid";
import { ModrinthProject } from "./Modrinth/project";
import { useColorScheme } from "@mui/joy/styles";
import ModManagement from "./Components/ModManagement";
import { Divider, Sheet, Typography } from "@mui/joy";

function App() {
  const [projects, setProjects] = useState<ModrinthProject[]>([]);
  const { setMode } = useColorScheme();
  setMode("dark");

  return (
    <Sheet sx={{ height: "100%" }}>
      <Sheet sx={{ padding: "32px" }}>
        <Typography level="h1">Modrinth Compatibility Finder</Typography>
        <ModManagement projects={projects} setProjects={setProjects} />
        <Divider />
        <ModloadVersionGrid projects={projects as ModrinthProject[]} />
      </Sheet>
    </Sheet>
  );
}

export default App;
