"use client";

export function Label({ children, className = "" }) {
  return (
    <div className={`text-sm font-medium text-muted-foreground ${className}`}>
      {children}
    </div>
  );
}