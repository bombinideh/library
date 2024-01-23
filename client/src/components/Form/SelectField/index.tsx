import SVGChevronDown from "@/assets/chevron-down.svg?react";
import { DropdownItem } from "@/components/Elements/Dropdown";
import { forwardRef, useEffect, useState } from "react";
import FieldWrapper from "../FieldWrapper";
import { IField } from "../form";
import * as Styled from "./styles";

interface Option extends DropdownItem {
  value: string;
}

interface SelectFieldProps extends Omit<IField, "type"> {
  options?: Option[];
  currentValue: string;
}

export default function SelectField({
  label,
  id,
  error,
  options = [],
  currentValue,
  disabled,
  ...rest
}: SelectFieldProps) {
  const defaultOptionName = "Selecionar";
  const [optionName, setOptionName] = useState(defaultOptionName);

  useEffect(() => {
    if (currentValue && options.length) {
      const [currentOption] = options.filter(
        option => option.value === currentValue,
      );

      setOptionName(currentOption ? currentOption.text : defaultOptionName);
    } else setOptionName(defaultOptionName);
  }, [currentValue, options]);

  return (
    <FieldWrapper label={label} id={id} error={error} disabled={disabled}>
      <Styled.Dropdown
        Button={forwardRef<HTMLButtonElement>((props, ref) => (
          <Styled.SelectButton
            {...props}
            ref={ref}
            variant="support"
            text={optionName}
            SVG={{ color: "textSupport1" }}
            $error={!!error}
            disabled={disabled}
          >
            <SVGChevronDown />
          </Styled.SelectButton>
        ))}
        items={options}
        wrapperWidth="100%"
        focusOnOpen
      />

      <Styled.Field id={id} error={error} {...rest} type="text" />
    </FieldWrapper>
  );
}
