import { ChartAreaGradient } from "../components/area-chart";
import { ChartBarDefault } from "../components/bar-chart";
import { ChartPieLabel } from "../components/pie-chart";
import { ChartRadarGridCircle } from "../components/radar-chart";

export const DashboardView = async () => {
  return (
    <section className="p-4 bg-muted min-h-screen ">
      <h1 className="pb-4 font-semibold text-2xl">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-4">
          <ChartAreaGradient />
          <ChartPieLabel />
        </div>
        <div className="flex flex-col gap-y-4">
          <ChartBarDefault />
          <ChartRadarGridCircle />
        </div>
      </div>
    </section>
  );
};
