import { BaseInfoArray } from "@/interface/type";
import CardGrid from "./card-grid";
import InputControl from "../common/input-control";
import { cn } from "@/lib/utils";
import { InputType } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { EducationExp, ProjectExp, WorkExp } from "@/interface/store/resume";

const CardItem: React.FC<{
  items: BaseInfoArray[];
  updateValue: (info: Partial<EducationExp | WorkExp | ProjectExp>) => void;
  remove: () => void;
}> = ({ items, updateValue, remove }) => {
  return (
    <CardGrid>
      {items.map((item) => (
        <InputControl
          className={cn({ "col-span-2": item.type === InputType.Editable })}
          key={item.name}
          item={item}
          placeholder={item.placeholder}
          updateValue={(value) => updateValue({ [item.name]: value })}
        />
      ))}
      <div className="flex justify-end gap-x-1 col-span-2">
        <Button variant="destructive" size="sm" onClick={remove}>
          删除
        </Button>
      </div>
    </CardGrid>
  );
};

export default CardItem;
