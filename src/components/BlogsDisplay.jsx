import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchBlogsByTags } from "@/services/documentServices";
import { useEffect, useState } from "react";

export default function BlogsDisplay() {
  const [topics, setTopics] = useState([]);
  const tags = ["Technology", "Health", "food", "Lifestyle"];

   useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogsByTags(tags);
      setTopics(data);
    };
    loadBlogs();
  }, []);

  return (
    <div className="space-y-10 px-8">
      {topics.map((topic, i) => (
        <div key={i}>
          {/* Topic Header */}
          <h2 className="text-2xl font-semibold mb-4">{topic.title}</h2>

          {/* Cards grid: 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topic.cards.map((card, idx) => (
              <Card key={idx} className="p-16 min-w-48">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Separator between topics */}
          {i !== topics.length - 1 && <Separator className="my-10" />}
        </div>
      ))}
    </div>
  );
}
