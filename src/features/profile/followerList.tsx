import * as React from "react";

interface Item {
  key: string;
  name: string;
}

interface PropsType {
  items: Item[];
  renderer: (item: Item) => React.ReactNode;
}

export default function ListViewRenderProp(props: PropsType) {
  return (
    <ul>
      {props.items.map((item) => {
        return <li key={item.key}>{props.renderer(item)}</li>;
      })}
    </ul>
  );
}