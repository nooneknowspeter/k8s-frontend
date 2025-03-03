import { Dispatch, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
};

const ThemeSelect = (props: Props) => {
  const [selectedTheme, setSelectedTheme] = useState("system")

  console.log(selectedTheme);

  useEffect(() => {
    let primaryKey = "theme";

    if (window.localStorage.getItem(primaryKey) == null) { localStorage.setItem(primaryKey, "dark") }


    switch (selectedTheme) {
      case "dark":
        window.localStorage.theme = "dark"
        break;
      case "light":
        window.localStorage.theme = "light"
        break;
      default:
        window.localStorage.theme = "system"
        break;
    }
  }, [selectedTheme])

  return (
    <>
      <Select onValueChange={setSelectedTheme}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default ThemeSelect;
