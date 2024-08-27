import ResumeHeader from "@/components/layout/resume-header";
import ResumeCard from "@/components/resume/resume-card";

const Resume = () => {
  return (
    <div className="bg-background min-h-screen">
      <ResumeHeader />
      <div className="w-full flex">
        <div className="flex-1">
          <ResumeCard />
        </div>
        <div className="flex-1 bg-secondary h-[calc(100vh-64px)] overflow-y-scroll">
          22
        </div>
      </div>
    </div>
  );
};

export default Resume;
