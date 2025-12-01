import { generateMetadata as generateMetadataUtil } from "@/lib/generateMetadata";
import TopicPage from "./ClientPage";
import { topics } from "./data";

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const topic = topics[params.topic as keyof typeof topics];

  return generateMetadataUtil({
    title: `${topic.title} - Practice & Improve | InterviewExceler.Ai`,
    description: topic.description,
    path: `/products/aptitude/${params.topic}`,
  });
}

export default function Page({ params }: { params: { topic: string } }) {
  return <TopicPage params={params} />;
}
