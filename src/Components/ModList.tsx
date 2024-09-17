import React from "react";
import { ModrinthProject } from "../Modrinth/project";
import { Button, Sheet, Table } from "@mui/joy";

type Props = {
  projects: ModrinthProject[];
  setProjects: React.Dispatch<React.SetStateAction<ModrinthProject[]>>;
};

function ModList({ projects, setProjects }: Props) {
  function onModDelete(modId: string) {
    setProjects([...projects.filter((p) => p.id !== modId)]);
  }

  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th style={{ width: "var(--Table-firstColumnWidth)" }}>Icon</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Maximum Version</th>
            <th>Minimum Version</th>
            <th>Loaders</th>
            <th
              aria-label="last"
              style={{ width: "var(--Table-lastColumnWidth)" }}
            />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.slug}>
              <td>
                <img
                  style={{ height: "32px", width: "32px" }}
                  src={project.icon_url}
                  alt="Mod Icon"
                ></img>
              </td>
              <td>{project.slug}</td>
              <td>{project.title}</td>
              <td>{project.game_versions[project.game_versions.length - 1]}</td>
              <td>{project.game_versions[0]}</td>
              <td>{project.loaders.join(" ")}</td>
              <td>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => onModDelete(project.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default ModList;
