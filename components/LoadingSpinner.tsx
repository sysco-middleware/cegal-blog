import { Loader } from "@cegal/ui-components";
export function LoadingSpinner() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center ">
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-gray-700 opacity-75"></div>
        <div className="z-20 flex  items-center justify-center">
          <Loader size="3xlarge" />
        </div>
      </div>
    </>
  );
}
