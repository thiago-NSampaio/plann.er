import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

interface Activity {
  id: string;
  title: string;
  trip_id: string;
  occurs_at: string;
}

interface Category {
  date: string;
  activities: Activity[];
}

export function Activities() {
  const { tripId } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setCategories(response.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-4 md:space-y-6">
      {categories.map((category) => {
        return (
          <div key={category.date} className="space-y-0.5 md:space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-lg md:text-xl text-zinc-300 font-semibold">
                Dia {format(parseISO(category.date), "d")}
              </span>
              <span className="text-xs text-zinc-500"></span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map((activity) => {
                  return (
                    <div
                      key={activity.id}
                      className="space-y-1.5 md:space-y-2.5"
                    >
                      <div className="px-2 mb-2 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3 md:mr-0 md:px-4">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(parseISO(activity.occurs_at), "HH:mm")}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
``;
