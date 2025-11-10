export default function TimeOfComent({ Time }) {
  const d = new Date(Time);
  const formatted = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(d.getDate()).padStart(2, "0")}`;
  return <span className="">{formatted}</span>;
}
