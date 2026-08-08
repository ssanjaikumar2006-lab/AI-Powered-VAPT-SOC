import { STATUS } from "../../utils/constants";
import Badge from "./Badge";

export default function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return <Badge color={s.color}>{s.label}</Badge>;
}
