function ValidationError({
   text,
   className
}: {
   text: string;
   className?: string;
}) {
   return <p className={`text-center text-rose-600 px-2 ${className}`}>{text}</p>;
}

export { ValidationError };
