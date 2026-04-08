import { useState, useMemo } from "react";
import { influencers, type Event, type Persona, type Tier, type Platform } from "@/data/influencers";
import InfluencerCard from "@/components/InfluencerCard";
import FilterBar from "@/components/FilterBar";
import { Users } from "lucide-react";
import canvasLogo from "@/assets/canvas26-logo.png";

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function Index() {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [selectedPersonas, setSelectedPersonas] = useState<Persona[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<Tier[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);

  const filtered = useMemo(() => {
    return influencers.filter((i) => {
      if (selectedEvents.length && !selectedEvents.includes(i.event)) return false;
      if (selectedPersonas.length && !selectedPersonas.includes(i.persona)) return false;
      if (selectedTiers.length && !selectedTiers.includes(i.tier)) return false;
      if (selectedPlatforms.length && !i.platforms.some((p) => selectedPlatforms.includes(p))) return false;
      return true;
    });
  }, [selectedEvents, selectedPersonas, selectedTiers, selectedPlatforms]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border" style={{ backgroundColor: "#F7D949" }}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <img
            src={canvasLogo}
            alt="Miro Canvas 26"
            className="h-32 sm:h-44 w-auto"
          />
          <p className="-mt-5 text-foreground font-bold italic text-2xl">&nbsp; Influencer Directory</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Filters */}
        <FilterBar
          selectedEvents={selectedEvents}
          selectedPersonas={selectedPersonas}
          selectedTiers={selectedTiers}
          selectedPlatforms={selectedPlatforms}
          onToggleEvent={(e) => setSelectedEvents(toggle(selectedEvents, e))}
          onTogglePersona={(p) => setSelectedPersonas(toggle(selectedPersonas, p))}
          onToggleTier={(t) => setSelectedTiers(toggle(selectedTiers, t))}
          onTogglePlatform={(p) => setSelectedPlatforms(toggle(selectedPlatforms, p))}
          onClear={() => { setSelectedEvents([]); setSelectedPersonas([]); setSelectedTiers([]); setSelectedPlatforms([]); }}
        />

        {/* Results count */}
        <p className="mt-6 mb-4 text-sm text-muted-foreground">
          Showing {filtered.length} influencer{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
            {filtered.map((inf) => (
              <InfluencerCard key={inf.id} influencer={inf} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Users className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No influencers match the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
