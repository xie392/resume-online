import FooterToolbar from "@/components/designer/footer-toolbar";
import ResumePreview from "@/components/designer/resume-preview";

const Designer = () => {
  return (
    <div className="bg-gray-200 py-10 flex justify-center min-h-screen">
      {/* <div className="w-[1240px] bg-white min-h-[1754px] p-4 rounded-lg shadow-lg"></div> */}
      <div className="w-full">
        <ResumePreview>
          <div id="editor"></div>
        </ResumePreview>
      </div>

      {/* 底部工具栏 */}
      <FooterToolbar />
    </div>
  );
};

export default Designer;
