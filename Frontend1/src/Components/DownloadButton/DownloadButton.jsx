import { useState } from "react";

export function DownloadButton() {
    const [downloadState, setDownloadState] = useState(null);  // Correcting the useState declaration
    
    const DownloadData = () => {
        setDownloadState(true);

        // Simulate a download process
        setTimeout(() => {
            const data = new Blob(["Sample data for download"], { type: "text/plain" });
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "sample.txt");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownloadState("completed");
        }, 2000);
    };
  
    return (
        <>
            <button className="button-download" onClick={DownloadData}>
                {downloadState === true ? "Downloading..." : "Download"}
            </button>
        </>
    );
}
