import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose: () => void;
}
const Dialog = forwardRef<HTMLDivElement, DialogProps>(({
  className,
  children,
  open,
  onClose,
  ...props
}, ref) => {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div ref={ref} className={cn('bg-white rounded-lg shadow-xl max-w-md w-full', className)} {...props}>
          {children}
        </div>
      </div>;
});
Dialog.displayName = 'Dialog';
const DialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('p-6 pb-0', className)} {...props} />);
DialogHeader.displayName = 'DialogHeader';
const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => <h3 ref={ref} className={cn('text-lg font-semibold text-gray-800', className)} {...props} />);
DialogTitle.displayName = 'DialogTitle';
const DialogDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => <p ref={ref} className={cn('text-gray-500 mb-6', className)} {...props} />);
DialogDescription.displayName = 'DialogDescription';
const DialogContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('p-6', className)} {...props} />);
DialogContent.displayName = 'DialogContent';
const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('flex justify-end space-x-3 p-6 pt-0', className)} {...props} />);
DialogFooter.displayName = 'DialogFooter';
export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter };