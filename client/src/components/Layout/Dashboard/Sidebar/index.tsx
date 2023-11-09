import SVGBook from "@/assets/book.svg?react";
import SVGDocument from "@/assets/document.svg?react";
import SVGGear from "@/assets/gear.svg?react";
import SVGHouse from "@/assets/house.svg?react";
import SVGResize from "@/assets/resize.svg?react";
import SVGSignOut from "@/assets/sign-out.svg?react";
import SVGSun from "@/assets/sun.svg?react";
import SVGUsers from "@/assets/users.svg?react";
import Title from "@/components/Elements/Title";
import useAuth from "@/hooks/useAuth";
import { FunctionComponent, MouseEventHandler, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import * as Styled from "./styles";

interface Item {
  id: string;
  SVG: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  disabled?: boolean;
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Item = ({ id, SVG, text, disabled, to, onClick }: Item) => {
  if (disabled) return null;

  return (
    <Styled.NavigationItem
      id={id}
      {...(to && { as: NavLink, to })}
      {...(onClick && { as: "button", type: "button", onClick })}
    >
      <SVG />

      <span>{text}</span>
    </Styled.NavigationItem>
  );
};

interface ItemsProps {
  pick?: Item["id"][];
}

const NavigationItems = ({ pick }: ItemsProps) => {
  const items: Item[] = [
    {
      id: "home",
      SVG: SVGHouse,
      text: "Página inicial",
      to: "/",
      // disabled: true,
    },
    {
      id: "books",
      SVG: SVGBook,
      text: "Livros",
      to: "livros",
    },
    {
      id: "users",
      SVG: SVGUsers,
      text: "Usuários",
      to: "usuarios",
    },
    {
      id: "logs",
      SVG: SVGDocument,
      text: "Relatórios",
      to: "relatorios",
    },
  ].filter(({ id }) => {
    if (pick) return pick.includes(id);

    return true;
  });

  return (
    <>
      {items.map(item => (
        <Item key={item.text} {...item} />
      ))}
    </>
  );
};

const OptionItems = ({ pick }: ItemsProps) => {
  const { signOut } = useAuth();
  const items: Item[] = [
    {
      id: "account",
      SVG: SVGGear,
      text: "Minha conta",
      to: "/conta",
    },
    {
      id: "theme",
      SVG: SVGSun,
      text: "Alterar tema",
      onClick: () => {},
    },
    {
      id: "sign-out",
      SVG: SVGSignOut,
      text: "Sair",
      onClick: signOut,
    },
  ].filter(({ id }) => {
    if (pick) return pick.includes(id);

    return true;
  });

  return (
    <>
      {items.map(item => (
        <Item key={item.text} {...item} />
      ))}
    </>
  );
};

const Sidebar = forwardRef<HTMLDivElement>((...args) => {
  return (
    <Styled.Wrapper ref={args[1]}>
      <Styled.Header>
        <Title level={3} text="Acervo histórico" isHeadingElement={false} />

        <Styled.ResizeSidebar SVG={{ Component: SVGResize }} variant="support" />
      </Styled.Header>

      <Styled.DesktopNavigation>
        <div>
          <NavigationItems />
        </div>

        <div>
          <OptionItems />
        </div>
      </Styled.DesktopNavigation>

      <Styled.MobileNavigation>
        <NavigationItems pick={["home", "books", "users", "logs"]} />

        <OptionItems pick={["account"]} />
      </Styled.MobileNavigation>
    </Styled.Wrapper>
  );
});

export default Sidebar;
