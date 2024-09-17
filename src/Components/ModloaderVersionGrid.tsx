import React from "react";

import _ from "underscore";

import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";

import { ModrinthProject } from "../Modrinth/project";
import { useTheme } from "@mui/joy";

type Props = {
  projects: ModrinthProject[];
};

function ModloaderVersionGrid({ projects }: Props) {
  let theme = useTheme();

  const modloaders = _.uniq(projects.flatMap((project) => project.loaders));
  const mcversions = _.uniq(
    projects.flatMap((project) => project.game_versions).reverse()
  );

  let versions = mcversions.map((version) => {
    let cells: JSX.Element[] = [];

    for (let modloader of modloaders) {
      if (
        projects.every(
          (project) =>
            project.game_versions.includes(version) &&
            project.loaders.includes(modloader)
        )
      ) {
        cells.push(
          <td
            style={{ backgroundColor: theme.vars.palette.success.softBg }}
            key={modloader}
          >
            yes
          </td>
        );
      } else {
        cells.push(
          <td
            style={{ backgroundColor: theme.vars.palette.danger.softBg }}
            key={modloader}
          >
            no
          </td>
        );
      }
    }

    return (
      <tr key={version}>
        <th scope="row" key={version}>
          {version}
        </th>
        {cells}
      </tr>
    );
  });

  return (
    <Sheet variant="outlined" sx={{ padding: "16px", marginTop: "16px" }}>
      <Table
        sx={(theme) => ({ "& th": { textAlign: "center" } })}
        size="sm"
        stickyHeader={true}
      >
        <thead>
          <tr>
            <th key=""></th>
            {modloaders.map((ml) => (
              <th key={ml}>{ml}</th>
            ))}
          </tr>
        </thead>
        <tbody>{versions}</tbody>
      </Table>
    </Sheet>
  );
}

export default ModloaderVersionGrid;
