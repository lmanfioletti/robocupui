import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({
  className,
  ...props
}, ref) => <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>);
Table.displayName = 'Table';
const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({
  className,
  ...props
}, ref) => <thead ref={ref} className={cn('bg-gray-50', className)} {...props} />);
TableHeader.displayName = 'TableHeader';
const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({
  className,
  ...props
}, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />);
TableBody.displayName = 'TableBody';
const TableFooter = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({
  className,
  ...props
}, ref) => <tfoot ref={ref} className={cn('border-t bg-gray-50 font-medium', className)} {...props} />);
TableFooter.displayName = 'TableFooter';
const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({
  className,
  ...props
}, ref) => <tr ref={ref} className={cn('border-b border-gray-200 transition-colors hover:bg-gray-50/50', className)} {...props} />);
TableRow.displayName = 'TableRow';
const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({
  className,
  ...props
}, ref) => <th ref={ref} className={cn('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500', className)} {...props} />);
TableHead.displayName = 'TableHead';
const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({
  className,
  ...props
}, ref) => <td ref={ref} className={cn('px-6 py-4', className)} {...props} />);
TableCell.displayName = 'TableCell';
const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({
  className,
  ...props
}, ref) => <caption ref={ref} className={cn('mt-4 text-sm text-gray-500', className)} {...props} />);
TableCaption.displayName = 'TableCaption';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };