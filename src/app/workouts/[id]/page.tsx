import workoutsData from "@/data/workouts.json";
import WorkoutDetailPage, {
  WorkoutItem,
} from "../../../components/WorkoutDetailPage";
import { notFound } from "next/navigation";

// Generate all static paths at build time
export async function generateStaticParams() {
  return (workoutsData as WorkoutItem[]).map((workout) => ({
    id: workout.id.toString(),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const workoutId = parseInt(resolvedParams.id, 10);

  const workout = (workoutsData as WorkoutItem[]).find(
    (item) => item.id === workoutId,
  );

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailPage workout={workout} />;
}
