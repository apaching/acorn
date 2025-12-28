import {
  Select,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

interface CustomSelectProps {
  selectTriggerClassname?: string;
  placeholder: string;
  onSelect: () => void;
}

export default function CustomSelect({
  selectTriggerClassname,
  placeholder,
  onSelect,
}: CustomSelectProps) {
  return (
    <Select>
      <SelectTrigger className={`${selectTriggerClassname}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
