import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
interface AlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose: () => void;
}
const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(({
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
AlertDialog.displayName = 'AlertDialog';
const AlertDialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('p-6 pb-0', className)} {...props} />);
AlertDialogHeader.displayName = 'AlertDialogHeader';
const AlertDialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => <h3 ref={ref} className={cn('text-lg font-semibold text-gray-800', className)} {...props} />);
AlertDialogTitle.displayName = 'AlertDialogTitle';
const AlertDialogDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => <p ref={ref} className={cn('text-gray-500 mt-2', className)} {...props} />);
AlertDialogDescription.displayName = 'AlertDialogDescription';
const AlertDialogContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('p-6', className)} {...props} />);
AlertDialogContent.displayName = 'AlertDialogContent';
const AlertDialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('flex justify-end space-x-3 p-6 pt-0', className)} {...props} />);
AlertDialogFooter.displayName = 'AlertDialogFooter';
export { AlertDialog, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogContent, AlertDialogFooter };