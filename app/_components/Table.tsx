"use client";

import { createContext, ReactElement, ReactNode, useContext } from "react";
import Empty from "./Empty";

interface ITableContext {
  columns: string;
}

interface TableProps {
  columns: string;
  children: ReactNode;
}

interface TableHeaderRowProps {
  children: ReactElement | ReactElement[];
}

interface TableBodyProps<T> {
  data: T[] | undefined;
  render: (dataItem: T) => ReactElement;
}

const TableContext = createContext<ITableContext>({} as ITableContext);

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div role="table">{children}</div>
    </TableContext.Provider>
  );
}

function Header({ children }: TableHeaderRowProps) {
  //const { columns } = useContext(TableContext);
  return <div role="row">{children}</div>;
}

function Row({ children }: TableHeaderRowProps) {
  const { columns } = useContext(TableContext);
  return <div role="row">{children}</div>;
}

function Footer({ children }: TableHeaderRowProps) {
  return <span>{children}</span>;
}

function Body<T extends {}>({ data, render }: TableBodyProps<T>) {
  if (!data?.length) return <p>No data to show at the moment.</p>;
  return <section>{data?.map(render)}</section>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
