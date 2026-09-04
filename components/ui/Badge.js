export default function Badge({ children, tone = "default" }) {
  const styles = {
    default: "bg-slate-800 text-slate-200",
    green: "bg-lime-300/15 text-lime-300",
    amber: "bg-amber-300/15 text-amber-200",
    red: "bg-red-400/15 text-red-300",
    blue: "bg-blue-400/15 text-blue-200",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
