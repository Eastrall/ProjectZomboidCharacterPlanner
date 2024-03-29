import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import clsx from "clsx";

import { Trait } from "@app/types";
import { useLocale } from "@app/hooks";
import { pointsStyle } from "@shared/styles/points.style";

type Props = {
  canBeSelected: boolean,
  className?: string | object,
  trait: Trait,
  onTraitClick: (trait: Trait) => void,
} & ComponentPropsWithoutRef<"li">;

const TraitItem: FunctionComponent<Props> = (props: Props) => {
  const { canBeSelected, onTraitClick, trait, className = null, ...rest } = props;
  const { translate } = useLocale();

  const handleTraitClick = (): void => {
    if (canBeSelected) {
      onTraitClick(trait);
    }
  };

  return (
    <li
      className={clsx("flex items-center h-8 rounded-md my-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-700", {
        'hover:cursor-pointer': canBeSelected,
        'line-through hover:cursor-not-allowed': !canBeSelected,
      }, className)}
      onClick={handleTraitClick}
      {...rest}
    >
      <img src={`assets/images/traits/${trait.icon}`} width="16" height="16" />

      <div className="flex justify-between w-full ml-3">
        <div>{translate(trait.name)}</div>

        <div className={pointsStyle(trait.points)}>
          { trait.points > 0 ? `+${trait.points}` : trait.points}
        </div>
      </div>
    </li>
  );
};

export default TraitItem;
