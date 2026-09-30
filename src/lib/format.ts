import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatArticleDate(iso: string | null) {
  return iso ? format(new Date(iso), "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : "";
}
