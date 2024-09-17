import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  Autocomplete,
  AutocompleteOption,
  ListItemDecorator,
  ListItemContent,
  Button,
} from "@mui/joy";
import { useDebouncedCallback } from "use-debounce";
import { ModrinthSearchResultHit } from "../Modrinth/searchResult";
import { ModrinthProject } from "../Modrinth/project";

type Props = {
  onModAdd: (modId?: string) => void;
  projects: ModrinthProject[];
};

function ModInput({ onModAdd, projects }: Props) {
  const [value, setValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const debouncer = useDebouncedCallback((v) => {
    fetch(
      "https://api.modrinth.com/v2/search?" +
        new URLSearchParams({
          query: v,
          facets: '[["project_type:mod"]]',
        }).toString()
    )
      .then((res) => res.json())
      .then((res) => setAutoCompleteOptions(res.hits));
  }, 500);

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    ModrinthSearchResultHit[]
  >([]);

  const onChange = (_: any, v: string | ModrinthSearchResultHit | null) => {
    if (typeof v !== "string" && v !== null) {
      onModAdd(v.project_id);
      setValue("");
      setInputValue("");
      setAutoCompleteOptions([]);
    }
  };

  return (
    <form id="mod-input">
      <FormControl>
        <FormLabel>Search Mods</FormLabel>
        <Autocomplete
          freeSolo
          options={autoCompleteOptions}
          value={value}
          onChange={onChange}
          inputValue={inputValue}
          onInputChange={(_, val) => {
            setInputValue(val);
            debouncer(val ?? "");
          }}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.title
          }
          renderOption={(props, option) => {
            let { key, ...propsWithoutKey } = props as any;
            return (
              <AutocompleteOption key={option.project_id} {...propsWithoutKey}>
                <ListItemDecorator>
                  <img
                    style={{ height: "32px", width: "32px" }}
                    src={option.icon_url}
                    alt=""
                  />
                </ListItemDecorator>
                <ListItemContent>{option.title}</ListItemContent>
                <ListItemDecorator>
                  <Button
                    disabled={projects.some((p) => p.id === option.project_id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onModAdd(option.project_id);
                    }}
                  >
                    +
                  </Button>
                </ListItemDecorator>
              </AutocompleteOption>
            );
          }}
        />
        {/* <Input
          placeholder="Mod Name"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          endDecorator={
            <Button type="submit">Add</Button>
          }
        ></Input> */}
      </FormControl>
    </form>
  );
}

export default ModInput;
