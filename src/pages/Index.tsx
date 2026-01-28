import { useState } from "react";
import HeartFiller from "@/components/HeartFiller";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import LoveLetter from "@/components/LoveLetter";
import ValentineQuestion from "@/components/ValentineQuestion";

type Page = "heart" | "reasons" | "letter" | "question";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("heart");

  const renderPage = () => {
    switch (currentPage) {
      case "heart":
        return <HeartFiller onComplete={() => setCurrentPage("reasons")} />;
      case "reasons":
        return <ReasonsILoveYou onComplete={() => setCurrentPage("letter")} />;
      case "letter":
        return <LoveLetter onComplete={() => setCurrentPage("question")} />;
      case "question":
        return <ValentineQuestion />;
      default:
        return <HeartFiller onComplete={() => setCurrentPage("reasons")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {renderPage()}
    </div>
  );
};

export default Index;
