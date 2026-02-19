import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";
import { Dispatch } from "react";

interface SelectOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface CustomSelectProps {
  items: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  selectTriggerClassname?: string;
  isDisabled?: boolean;
}

export default function CustomSelect({
  items,
  selectedValue,
  onSelect,
  placeholder,
  selectTriggerClassname,
  isDisabled,
}: CustomSelectProps) {
  return (
    <Select
      value={selectedValue}
      onValueChange={onSelect}
      disabled={isDisabled}
    >
      <SelectTrigger className={`${selectTriggerClassname}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
