"use client";

import { useTransition } from "react";
import Icon from "@/components/Icon";
import { updateLeadStatus, deleteLead } from "@/app/admin/(panel)/leads/actions";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  interest: string | null;
  source: string | null;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  new: "bg-tertiary-container/20 text-tertiary border border-tertiary-container/40",
  contacted: "bg-primary-fixed text-primary border border-primary/20",
  enrolled: "bg-clever-green/10 text-clever-green border border-clever-green/30",
};

export default function LeadRow({ lead }: { lead: Lead }) {
  const [pending, start] = useTransition();

  return (
    <tr className="hover:bg-surface-container-low/60 transition-colors align-top">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
            {lead.name.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-semibold text-primary">{lead.name}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <a href={`tel:${lead.phone}`} className="text-on-surface hover:text-primary">
            {lead.phone}
          </a>
          {lead.email && (
            <span className="text-sm text-on-surface-variant">{lead.email}</span>
          )}
        </div>
      </td>
      <td className="py-4 px-4 text-on-surface-variant">{lead.interest ?? "-"}</td>
      <td className="py-4 px-4 text-on-surface-variant whitespace-nowrap">
        {lead.city ?? "-"}
      </td>
      <td className="py-4 px-4 text-on-surface-variant whitespace-nowrap text-sm">
        {new Date(lead.createdAt).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="py-4 px-4">
        <select
          value={lead.status}
          disabled={pending}
          onChange={(e) =>
            start(() => updateLeadStatus(lead.id, e.target.value))
          }
          className={`rounded-full text-xs font-semibold px-3 py-1 border cursor-pointer focus:ring-primary ${
            statusStyles[lead.status] ?? statusStyles.new
          }`}
        >
          <option value="new">Новая</option>
          <option value="contacted">Связались</option>
          <option value="enrolled">Записан</option>
        </select>
      </td>
      <td className="py-4 px-4 text-right">
        <button
          title="Удалить"
          disabled={pending}
          onClick={() => {
            if (confirm(`Удалить заявку от ${lead.name}?`))
              start(() => deleteLead(lead.id));
          }}
          className="text-outline hover:text-error transition-colors p-1 disabled:opacity-50"
        >
          <Icon name="more_vert" />
        </button>
      </td>
    </tr>
  );
}
