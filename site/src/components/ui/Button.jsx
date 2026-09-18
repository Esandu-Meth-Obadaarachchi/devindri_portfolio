import { Magnetic } from "./Magnetic";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-[transform,background-color,color] duration-200 active:scale-[0.98]";

const variants = {
  solid: "bg-rose text-paper hover:bg-rose-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-plum hover:bg-blush",
  ghostLight: "border border-paper/40 text-paper hover:bg-paper hover:text-plum",
};

export function Button({
  as = "button",
  variant = "solid",
  className = "",
  magnetic = true,
  cursor = "action",
  children,
  ...rest
}) {
  const Tag = as;
  const node = (
    <Tag className={`${base} ${variants[variant]} ${className}`} data-cursor={cursor} {...rest}>
      {children}
    </Tag>
  );

  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
