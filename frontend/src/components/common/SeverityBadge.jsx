import { SEVERITY } from "../../utils/constants";
import Badge from "./Badge";

export default function SeverityBadge({ level }) {
  const s = SEVERITY[level] || SEVERITY.info;
  return <Badge color={s.color} bg={s.bg}>{s.label}</Badge>;
}
